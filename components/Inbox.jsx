import { View, Text } from 'react-native'
import React from 'react'

export default function Inbox({title,containerStyles,titleStyles}) {
  return (
    <View className={containerStyles}>
      <Text className=
      {titleStyles}>{title}</Text>
    </View>
  )
}