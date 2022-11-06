import { Text, View, StyleSheet, TextInput, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import moment from "moment";

export default function Monthly(props) {
  const [principle3, setPrinciple3] = useState(0);
  const [servicecharge3, setServicecharge3] = useState(0);
  const [outstanding3, setOutstanding3] = useState(0);
  const [recoverable3, setRecoverable3] = useState(0);
  const [sl, setSl] = useState();
  const [date, setDate] = useState(props.date);

  useEffect(() => {
    async function getdata() {
      const day =
        moment(date).diff(props.date, "days") + moment(date).daysInMonth();

      setServicecharge3(
        props.openingoutstanding * day * (props.interestrate / 36000)
      );
      props.recoverable < props.openingoutstanding
        ? setRecoverable3(props.recoverable)
        : setRecoverable3(props.openingoutstanding + servicecharge3);

      setPrinciple3(recoverable3 - servicecharge3);
      setOutstanding3(props.openingoutstanding - principle3);

      setSl(props.sl + 1);
    }
    getdata();
  }, [
    date,
    servicecharge3,
    principle3,
    recoverable3,
    props.openingoutstanding,
    props.date,
    props.recoverable,
    props.interestrate,
  ]);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };
  const showMode = () => {
    DateTimePickerAndroid.open({
      value: new Date(date),
      onChange,
    });
  };
  return (
    <>
      <View style={styles.contenttableheader}>
        <Text style={{ ...styles.tablecontenttext, flex: 3, flexShrink: 1 }}>
          {sl}
        </Text>
        <Text style={{ ...styles.tablecontenttext }}>
          {moment(props.date).format("DD-MM-YY")}
        </Text>

        <Text onPress={showMode} style={styles.tablecontenttext}>
          {moment(date).format("DD-MM-YY")}
        </Text>
        <Text style={styles.tablecontenttext}>{Math.ceil(recoverable3)}</Text>
        <Text style={styles.tablecontenttext}>{Math.ceil(principle3)}</Text>
        <Text style={styles.tablecontenttext}>
          {Math.round(servicecharge3)}
        </Text>
        <Text style={styles.tablecontenttext}>{Math.ceil(outstanding3)}</Text>
      </View>
      {
        <View>
          {outstanding3 > 0 ? (
            <Monthly
              sl={sl}
              date={new Date(date).setDate(
                new Date(date).getDate() + moment(date).daysInMonth()
              )}
              interestrate={props.interestrate}
              recoverable={props.recoverable}
              openingoutstanding={outstanding3}
            />
          ) : null}
        </View>
      }
    </>
  );
}
const styles = StyleSheet.create({
  contenttableheader: {
    flexDirection: "row",
  },

  tablecontenttext: {
    height: 20,
    flex: 7,
    textTransform: "capitalize",
    textAlign: "center",
    borderWidth: 0.3,
    fontSize: 12,
    paddingHorizontal: 2,
    textAlignVertical: "center",
  },
  tablecontentinput: {
    height: 20,
    flex: 4,
    textTransform: "capitalize",
    textAlign: "center",
    borderWidth: 0.3,
    fontSize: 12,
    paddingHorizontal: 0.5,
    textAlignVertical: "center",
    backgroundColor: "white",
    color: "black",
  },
});
