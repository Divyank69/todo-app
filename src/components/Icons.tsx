import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

type IconProps = {
  name: string;
  type?: 'FontAwesome' | 'Ionicons' | 'MaterialIcons' | 'Entypo';
  size?: number | string;
  color?: string;
};

export default function Icon({
  name,
  type = 'FontAwesome',
  size = 24,
  color = '#000',
}: IconProps) {
    const safesize=Number(size)  
  switch (type) {
    case 'Ionicons':
      return <Ionicons name={name} size={safesize} color={color} />;
    case 'MaterialIcons':
      return <MaterialIcons name={name} size={safesize} color={color} />;
    case 'Entypo':
      return <Entypo name={name} size={safesize} color={color} />;
    case 'FontAwesome':
    default:
      return <FontAwesome name={name} size={safesize} color={color} />;
  }
}

