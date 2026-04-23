import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";

export default function HomeScreen() {
  const [usd, setUsd] = useState("0.00");
  const [eur, setEur] = useState("0.00");
  const [data, setData] = useState("");

  const buscar = async () => {
    try {
      const res = await fetch("https://economia.awesomeapi.com.br/json/all");
      const json = await res.json();

      setUsd(parseFloat(json.USD.bid).toFixed(2));
      setEur(parseFloat(json.EUR.bid).toFixed(2));
      setData(new Date().toLocaleString());
    } catch (e) {
      console.log(e);
      alert("Erro ao carregar cotações");
    }
  };

  useEffect(() => {
    buscar();
  }, []);

  return (
  <View style={styles.container}>

    {/* HEADER */}
    <View style={styles.header}>
      <Text style={styles.title}>
        Conversor de{"\n"}Moedas PRO
      </Text>
    </View>

    {/* CARDS */}
    <View style={styles.content}>

      <View style={styles.updateBox}>
        <Text style={{ fontWeight: "bold" }}>Cotação Atual</Text>
        <Text style={{ color: "#777", fontSize: 12 }}>
          Última Atualização: {data}
        </Text>
      </View>

      <View style={styles.card}>
        <View>
          <Text style={styles.code}>USD / BRL</Text>
          <Text style={styles.name}>1 Dólar Americano</Text>
        </View>
        <Text style={styles.value}>R$ {usd}</Text>
      </View>

      <View style={styles.card}>
        <View>
          <Text style={styles.code}>EUR / BRL</Text>
          <Text style={styles.name}>1 Euro</Text>
        </View>
        <Text style={styles.value}>R$ {eur}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={buscar}>
        <Text style={styles.buttonText}>Atualizar Cotações</Text>
      </TouchableOpacity>

    </View>

  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4CAF50"
  },

  header: {
    backgroundColor: "#4CAF50",
    paddingTop: 60,
    paddingBottom: 100,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: "center"
  },

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
    fontStyle: "italic",
    textAlign: "center"
  },

  subtitle: {
    color: "#e0e0e0",
    marginTop: 5
  },

  content: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    marginTop: -40, 
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 60,
    paddingHorizontal: 20
  },

  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 15,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2
  },

  updateBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",

    position: "absolute",
    top: -30,
    left: 20,
    right: 20,

    elevation: 5,
    zIndex: 10
  },

  code: {
    fontWeight: "bold",
    fontSize: 16
  },

  name: {
    color: "#777",
    fontSize: 12
  },

  value: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#000000"
  },

  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 15
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  }
});
