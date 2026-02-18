import { Stack } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const taxiLogo = require("../assets/images/taxi.png");

export default function Input() {
  const [distance, setDistance] = useState("");
  const [waitTime, setWaitTime] = useState("");
  const [totalFare, setTotalFare] = useState(0);
  const [distCost, setDistCost] = useState(0);
  const [waitCost, setWaitCost] = useState(0);

  const handleCalculate = () => {
    const d = parseFloat(distance) || 0;
    const w = parseFloat(waitTime) || 0;
    let fare = 35;
    let distanceCharge = 0;

    if (d > 1) {
      let remainingDist = d - 1;
      if (remainingDist <= 9) distanceCharge += remainingDist * 6.5;
      else {
        distanceCharge += 9 * 6.5;
        remainingDist -= 9;
        if (remainingDist <= 10) distanceCharge += remainingDist * 7.0;
        else {
          distanceCharge += 10 * 7.0;
          remainingDist -= 10;
          if (remainingDist <= 20) distanceCharge += remainingDist * 8.0;
          else {
            distanceCharge += 20 * 8.0;
            remainingDist -= 20;
            if (remainingDist <= 20) distanceCharge += remainingDist * 8.5;
            else {
              distanceCharge += 20 * 8.5;
              remainingDist -= 20;
              if (remainingDist <= 20) distanceCharge += remainingDist * 9.0;
              else {
                distanceCharge += 20 * 9.0;
                remainingDist -= 20;
                distanceCharge += remainingDist * 10.5;
              }
            }
          }
        }
      }
    }
    const timeCharge = w * 3.0;
    setDistCost(distanceCharge + 35);
    setWaitCost(timeCharge);
    setTotalFare(distanceCharge + 35 + timeCharge);
  };

  const handleReset = () => {
    setDistance("");
    setWaitTime("");
    setTotalFare(0);
    setDistCost(0);
    setWaitCost(0);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F2F4F7" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Stack.Screen options={{ headerShown: false }} />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* รูปภาพ */}
          <Image source={taxiLogo} style={styles.headerImage} />
          <Text style={styles.mainTitle}>คำนวณค่าแท็กซี่</Text>

          <View style={styles.card}>
            <Text style={styles.inputLabel}>ระยะทาง (กิโลเมตร)</Text>
            <TextInput
              placeholder="0.0"
              keyboardType="numeric"
              style={styles.input}
              value={distance}
              onChangeText={setDistance}
            />

            <Text style={styles.inputLabel}>เวลารถติด (นาที)</Text>
            <TextInput
              placeholder="0"
              keyboardType="numeric"
              style={styles.input}
              value={waitTime}
              onChangeText={setWaitTime}
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity
                onPress={handleCalculate}
                style={styles.btnCalculate}
              >
                <Text style={styles.btnTextWhite}>คำนวณราคา</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleReset} style={styles.btnReset}>
                <Text style={styles.btnTextRed}>ล้างค่า</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>ค่าโดยสารโดยประมาณ</Text>
            <View style={styles.totalRow}>
              <Text style={styles.totalAmount}>
                {totalFare.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </Text>
              <Text style={styles.totalUnit}>บาท</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>ค่าโดยสารตามระยะทาง</Text>
              <Text style={styles.detailValue}>{distCost.toFixed(2)} ฿</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>ค่ารถติด (นาที)</Text>
              <Text style={styles.detailValue}>{waitCost.toFixed(2)} ฿</Text>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>ID: 6652410033</Text>
            <Text style={styles.footerText}>NAME: จิรวัฒน์ สัจจญาติ</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: { alignItems: "center", paddingBottom: 30, paddingTop: 40 },
  headerImage: {
    width: "60%",
    height: 110,
    resizeMode: "contain",
  },
  mainTitle: {
    fontFamily: "Kanit_700Bold",
    fontSize: 28,
    color: "#facc15",
    marginBottom: 12,
    marginTop: 0,
  },
  card: {
    backgroundColor: "#ffffff",
    width: "92%",
    borderRadius: 18,
    padding: 18,
    elevation: 3,
  },
  inputLabel: {
    fontFamily: "Kanit_600SemiBold",
    fontSize: 15,
    color: "#1e293b",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#F2F4F7",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    fontFamily: "Kanit_400Regular",
    marginBottom: 15,
  },
  buttonRow: { flexDirection: "row", justifyContent: "space-between" },
  btnCalculate: {
    backgroundColor: "#00a18c",
    flex: 1.5,
    padding: 14,
    borderRadius: 12,
    marginRight: 10,
    alignItems: "center",
  },
  btnReset: {
    backgroundColor: "#ffffff",
    borderWidth: 1.5,
    borderColor: "#FCA5A5",
    flex: 1,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  btnTextWhite: {
    color: "#ffffff",
    fontFamily: "Kanit_600SemiBold",
    fontSize: 16,
  },
  btnTextRed: {
    color: "#F87171",
    fontFamily: "Kanit_600SemiBold",
    fontSize: 16,
  },
  resultCard: {
    backgroundColor: "#334155",
    width: "92%",
    borderRadius: 18,
    padding: 20,
    marginTop: 15,
  },
  resultTitle: {
    color: "#94A3B8",
    textAlign: "center",
    fontFamily: "Kanit_400Regular",
    fontSize: 14,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
    marginVertical: 8,
  },
  totalAmount: { color: "#facc15", fontSize: 44, fontFamily: "Kanit_700Bold" },
  totalUnit: {
    color: "#facc15",
    fontSize: 20,
    fontFamily: "Kanit_600SemiBold",
    marginLeft: 8,
  },
  divider: { height: 1, backgroundColor: "#475569", marginVertical: 12 },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailLabel: {
    color: "#CBD5E1",
    fontFamily: "Kanit_400Regular",
    fontSize: 14,
  },
  detailValue: {
    color: "#FFFFFF",
    fontFamily: "Kanit_600SemiBold",
    fontSize: 14,
  },
  footer: { marginTop: 25, alignItems: "center" },
  footerText: {
    fontFamily: "Kanit_600SemiBold",
    fontSize: 15,
    color: "#64748B",
  },
});
