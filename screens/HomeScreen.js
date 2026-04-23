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
      <Text style={styles.title}>Cotação de Moedas</Text>
      <Text style={styles.subtitle}>Atualizado: {data}</Text>
    </View>

    {/* CARDS */}
    <View style={styles.content}>

      <View style={styles.card}>
        <View>
          <Text style={styles.code}>USD / BRL</Text>
          <Text style={styles.name}>Dólar Americano</Text>
        </View>
        <Text style={styles.value}>R$ {usd}</Text>
      </View>

      <View style={styles.card}>
        <View>
          <Text style={styles.code}>EUR / BRL</Text>
          <Text style={styles.name}>Euro</Text>
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
    padding: 25,
    marginTop: 20
  },

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold"
  },

  subtitle: {
    color: "#e0e0e0",
    marginTop: 5
  },

  content: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3
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
    color: "#2e7d32"
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