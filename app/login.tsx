import { AntDesign } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import { useAuth } from '../hooks/useAuth';

export default function LoginScreen() {
  const router = useRouter();
  const { login, loading } = useAuth(); 

  const [email, setEmail] = React.useState('flagshipcenter@gmail.com');
  const [password, setPassword] = React.useState('Dd147741@'); 

  const handleLogin = async () => {
    const result = await login(email, password);

    if (result.success) {
      Alert.alert("Thành công!", result.message);
      router.replace('/(tabs)'); 
    } else {
      Alert.alert("Lỗi Đăng nhập", result.message);
    }
  };

  return (
    // ✅ Sử dụng SafeAreaView từ 'react-native-safe-area-context'
    <SafeAreaView style={styles.container}> 
      {/* Ẩn Header mặc định của màn hình Stack */}
      <Stack.Screen options={{ headerShown: false }} /> 
      
      <View style={styles.content}>
        
        <AntDesign name="car" size={60} color={Colors.primary} style={{ marginBottom: 30 }} />
        <Text style={styles.title}>Quản lý Xe Điện</Text>
        <Text style={styles.subtitle}>Vui lòng đăng nhập bằng tài khoản đại lý</Text>

        {/* Trường Email */}
        <View style={styles.inputContainer}>
          <AntDesign name="mail" size={20} color="gray" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </View>

        {/* Trường Mật khẩu */}
        <View style={styles.inputContainer}>
          <AntDesign name="lock" size={20} color="gray" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity 
          style={[styles.loginButton, loading && styles.loginButtonDisabled]} 
          onPress={handleLogin} 
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>
            {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    title: { fontSize: 28, fontWeight: 'bold', color: Colors.text, marginBottom: 10 },
    subtitle: { fontSize: 16, color: 'gray', marginBottom: 30 },
    inputContainer: { flexDirection: 'row', alignItems: 'center', width: '100%', borderColor: '#ccc', borderWidth: 1, borderRadius: 10, marginVertical: 10, paddingHorizontal: 15 },
    icon: { marginRight: 10 },
    input: { flex: 1, height: 50, fontSize: 16 },
    loginButton: {
        backgroundColor: Colors.primary,
        width: '100%',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    loginButtonDisabled: {
        backgroundColor: '#99badd', 
    },
    loginButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});