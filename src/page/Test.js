import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Text, TextInput, View, StyleSheet, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

export default function Test() {
  const [date, setDate] = useState(new Date());
  const [date2, setDate2] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const onChange2 = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate2(currentDate);
  };

  const showMode = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
    });
  };
  const showMode2 = () => {
    DateTimePickerAndroid.open({
      value: date2,
      onChange: onChange2,
    });
  };
  return (
    <View style={styles.table}>
      <Text onPress={showMode} style={styles.input}>
        {date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}
      </Text>
      <Text onPress={showMode2} style={styles.input}>
        {date2.getDate()}-{date2.getMonth() + 1}-{date2.getFullYear()}
      </Text>
      <Text style={styles.input}>{new Date(date2 - date).getDate() - 1}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  table: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  input: {
    height: 30,
    paddingHorizontal: 10,
    backgroundColor: "pink",
    marginTop: 5,
    textAlign: "center",
  },
});
