import Colors from '@/constants/Colors';
import { useFetchAllocations } from '@/hooks/useFetchAllocations';
import React, { useCallback, useMemo, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    RefreshControl,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const STATUS_OPTIONS = ['all', 'delivered', 'shipped', 'cancelled'] as const;
type StatusFilter = typeof STATUS_OPTIONS[number];

type SortKey = 'recent' | 'oldest' | 'qty';

export default function AllocationListScreen() {
  const { allocations, loading, error, fetchAllocations } = useFetchAllocations();

  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<StatusFilter>('all');
  const [sort, setSort] = useState<SortKey>('recent');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchAllocations(); // nếu hook hỗ trợ; nếu không có tham số thì bỏ object
    } finally {
      setRefreshing(false);
    }
  }, [fetchAllocations]);

  const totals = useMemo(() => {
    const total = allocations.length;
    const totalVIN = allocations.reduce((sum, a) => sum + (a.vinCount || 0), 0);
    return { total, totalVIN };
  }, [allocations]);

  const filteredSorted = useMemo(() => {
    const q = query.trim().toLowerCase();

    let arr = allocations.filter((item) => {
      const name = (item.product?.name ?? '').toLowerCase();
      const version = (item.product?.version ?? '').toLowerCase();
      const matchText = q ? (name.includes(q) || version.includes(q)) : true;
      const matchStatus = status === 'all' ? true : item.status === status;
      return matchText && matchStatus;
    });

    arr = [...arr].sort((a, b) => {
      if (sort === 'recent') {
        const ad = new Date(a.createdAt).getTime();
        const bd = new Date(b.createdAt).getTime();
        return bd - ad;
      }
      if (sort === 'oldest') {
        const ad = new Date(a.createdAt).getTime();
        const bd = new Date(b.createdAt).getTime();
        return ad - bd;
      }
      // qty
      return (b.quantity || 0) - (a.quantity || 0);
    });

    return arr;
  }, [allocations, query, status, sort]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={{ marginTop: 8 }}>Đang tải danh sách phân bổ...</Text>
        <View style={{ height: 20 }} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>{error}</Text>
        <TouchableOpacity onPress={onRefresh} style={[styles.btn, { marginTop: 12 }]}>
          <Text style={styles.btnText}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderItem = ({ item }: any) => {
    const thumb = item.product?.images?.[0];
    const statusStyle = getStatusStyle(item.status);

    return (
      <TouchableOpacity style={styles.card} activeOpacity={0.9}>
        <Image
          source={{ uri: thumb }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={1}>
              {item.product?.name}
              {item.product?.version ? ` • ${item.product.version}` : ''}
            </Text>
            <View style={[styles.badge, statusStyle.badgeBg]}>
              <Text style={[styles.badgeText, statusStyle.badgeText]}>
                {item.status.toUpperCase()}
              </Text>
            </View>
          </View>

          {item.deliveredAt ? (
            <Text style={styles.meta}>
              dự kiến: {new Date(item.deliveredAt).toLocaleString('vi-VN')}
            </Text>
          ) : item.allocatedAt ? (
            <Text style={styles.meta}>
              hủy: {new Date(item.allocatedAt).toLocaleString('vi-VN')}
            </Text>
          ) : null}
        </View>

        <Text style={styles.chev}>{'›'}</Text>
      </TouchableOpacity>
    );
  };

  const ListHeader = (
    <View style={styles.headerWrap}>
      <View style={styles.searchRow}>
        <TextInput
          placeholder="Tìm theo tên xe hoặc phiên bản…"
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
          placeholderTextColor="#9aa0a6"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')} style={styles.clearBtn}>
            <Text style={{ fontSize: 12 }}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.pillRow}>
        {STATUS_OPTIONS.map((s) => {
          const active = status === s;
          return (
            <TouchableOpacity
              key={s}
              style={[styles.pill, active && styles.pillActive]}
              onPress={() => setStatus(s)}
            >
              <Text style={[styles.pillText, active && styles.pillTextActive]}>
                {s === 'all' ? 'Tất cả' :
                 s === 'delivered' ? 'Delivered' :
                 s === 'shipped' ? 'Shipped' : 'Cancelled'}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.sortRow}>
        <Text style={styles.sortLabel}>Sắp xếp:</Text>
        <SortChip label="Gần nhất" active={sort === 'recent'} onPress={() => setSort('recent')} />
        <SortChip label="Cũ nhất" active={sort === 'oldest'} onPress={() => setSort('oldest')} />
        <SortChip label="Số lượng" active={sort === 'qty'} onPress={() => setSort('qty')} />
      </View>

      <Text style={styles.countText}>
        Đang hiển thị: {filteredSorted.length}/{allocations.length}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={filteredSorted}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 12, paddingBottom: 28 }}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      ListHeaderComponent={ListHeader}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors.primary]} />
      }
      ListEmptyComponent={
        <View style={[styles.center, { paddingTop: 40 }]}>
          <Text style={{ fontSize: 16, marginBottom: 8 }}>Không có phân bổ phù hợp bộ lọc.</Text>
          <TouchableOpacity onPress={() => { setQuery(''); setStatus('all'); }} style={styles.btnLight}>
            <Text style={styles.btnLightText}>Xóa bộ lọc</Text>
          </TouchableOpacity>
        </View>
      }
    />
  );
}

/** ============== Helpers ============== */
function getStatusStyle(status: string) {
  if (status === 'delivered') {
    return { badgeBg: { backgroundColor: '#e8f5e9' }, badgeText: { color: '#1b5e20' } };
  }
  if (status === 'shipped') {
    return { badgeBg: { backgroundColor: '#fff8e1' }, badgeText: { color: '#8a6d1a' } };
  }
  if (status === 'cancelled') {
    return { badgeBg: { backgroundColor: '#ffebee' }, badgeText: { color: '#b71c1c' } };
  }
  return { badgeBg: { backgroundColor: '#eceff1' }, badgeText: { color: '#37474f' } };
}

function SortChip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.chip, active && styles.chipActive]}>
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },


  headerWrap: { backgroundColor: '#fff', paddingHorizontal: 12, paddingBottom: 8 },
  screenTitle: { fontSize: 22, fontWeight: '700', color: '#1f2937' },
  subtitle: { marginTop: 4, color: '#6b7280' },
  bold: { fontWeight: '700', color: '#111827' },

  searchRow: {
    marginTop: 12,
    position: 'relative',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: '#f9fafb',
  },
  clearBtn: {
    position: 'absolute',
    right: 10,
    top: 8,
    height: 28,
    width: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e5e7eb',
  },

  pillRow: { flexDirection: 'row', gap: 8, marginTop: 12, flexWrap: 'wrap' },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
  },
  pillActive: { backgroundColor: '#e6f4ff', borderColor: '#b3d9ff' },
  pillText: { fontSize: 12, color: '#374151' },
  pillTextActive: { fontWeight: '700', color: '#0b6efd' },

  sortRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10 },
  sortLabel: { color: '#6b7280' },

  chip: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
  },
  chipActive: { backgroundColor: '#eef2ff', borderColor: '#c7d2fe' },
  chipText: { fontSize: 12, color: '#444' },
  chipTextActive: { fontWeight: '700', color: '#4338ca' },

  countText: { marginTop: 10, color: '#6b7280', fontSize: 12 },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    padding: 12,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
  },
  image: { width: 96, height: 72, borderRadius: 10, backgroundColor: '#eef2f7' },
  titleRow: { flexDirection: 'row', alignItems: 'center' },
  badge: {
    marginLeft: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: { fontSize: 11, fontWeight: '700' },

  title: { fontSize: 16, fontWeight: '700', color: '#111827', flexShrink: 1 },
  meta: { color: '#6b7280', marginTop: 4, fontSize: 13 },

  chev: { fontSize: 26, color: '#c0c4c9', marginLeft: 8 },
  btn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  btnText: { color: '#fff', fontWeight: '700' },
  btnLight: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
  },
  btnLightText: { color: '#111827', fontWeight: '700' },
});
