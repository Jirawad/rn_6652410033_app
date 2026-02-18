import { router, Stack } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

const carlogo = require("../assets/images/taxi.png");

export default function Index() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/input");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* พื้นที่ว่างด้านบนเพื่อให้ Card อยู่กลาง */}
      <View style={styles.spacer} />

      {/* Card */}
      <View style={styles.card}>
        <Image source={carlogo} style={styles.carlogo} resizeMode="contain" />
        <Text style={styles.appnameen}>TAXI METER</Text>
        <Text style={styles.appnameth}>THAI FARE CALCULATOR</Text>
        <ActivityIndicator
          size="large"
          color="#059669"
          style={{ marginTop: 30 }}
        />
      </View>

      {/* SAUID */}
      <View style={[styles.spacer, styles.footerContainer]}>
        <View style={styles.footer}>
          <Text style={styles.footerText}>ID: 6652410033</Text>
          <Text style={styles.footerText}>NAME: จิรวัฒน์ สัจจญาติ</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#facc15",
    alignItems: "center",
  },
  spacer: {
    flex: 1,
    width: "100%",
  },
  card: {
    backgroundColor: "#fef08a",
    paddingVertical: 40,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignItems: "center",
    width: "90%",
    maxWidth: 400,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  carlogo: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  appnameen: {
    fontFamily: "Kanit_700Bold",
    fontSize: 32,
    color: "#1e293b",
    fontWeight: "bold",
  },
  appnameth: {
    fontFamily: "Kanit_400Regular",
    fontSize: 14,
    color: "#059669",
    marginTop: 10,
    fontWeight: "600",
  },
  footerContainer: {
    justifyContent: "flex-end",
    paddingBottom: 40,
  },
  footer: {
    alignItems: "center",
  },
  footerText: {
    fontFamily: "Kanit_400Regular",
    fontSize: 18,
    color: "#475569",
    fontWeight: "700",
    lineHeight: 28,
  },
});
