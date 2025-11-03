import { Tabs } from 'expo-router';
import { AntDesign, Feather } from '@expo/vector-icons';
import Colors from '@/constants/Colors';


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary, 
        headerShown: false, 
      }}
    >
      <Tabs.Screen
        name="index" 
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search" 
        options={{
          title: 'Tìm kiếm',
          tabBarIcon: ({ color }) => <Feather name="search" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile" 
        options={{
          title: 'Tài khoản',
          tabBarIcon: ({ color }) => <AntDesign name="user" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}