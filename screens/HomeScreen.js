import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image
} from "react-native";

const flags = {
  USD: "us",
  EUR: "eu",
  GBP: "gb",
  JPY: "jp",
  CAD: "ca",
  AUD: "au",
  BRL: "br",
  CHF: "ch",
  CNY: "cn",
  ARS: "ar",
  BTC: null 
};

const getFlag = (code) => {
  const country = flags[code];
  if (!country) return null;
  return `https://flagcdn.com/w40/${country}.png`;
};

export default function HomeScreen() {
  const [data, setData] = useState("");
  const [coins, setCoins] = useState([]);

  const buscar = async () => {
    try {
      const res = await fetch("https://economia.awesomeapi.com.br/json/all");
      const json = await res.json();

      const lista = Object.keys(json).map((key) => {
        return {
          code: key,
          name: json[key].name,
          value: parseFloat(json[key].bid).toFixed(2),
          pctChange: parseFloat(json[key].pctChange).toFixed(2)
        };
      });

      setCoins(lista);
      setData(new Date().toLocaleString());
    } catch (e) {
      console.log(e);
      alert("Erro ao carregar cotações");
    }
  };

  useEffect(() => {
    buscar();
  }, []);

  const renderCard = (item) => {
    const isPositive = item.pctChange >= 0;

    return (
      <View key={item.code} style={styles.card}>

        <View style={{ flexDirection: "row", alignItems: "center" }}>

          {getFlag(item.code) ? (
            <Image
              source={{ uri: getFlag(item.code) }}
              style={styles.flag}
            />
          ) : null}

          <View>
            <Text style={styles.code}>
              {item.code} / BRL
            </Text>
            <Text style={styles.name}>{item.name}</Text>
          </View>

        </View>

        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.value}>R$ {item.value}</Text>

          <Text
            style={[
              styles.change,
              { color: isPositive ? "#2ecc71" : "#e74c3c" }
            ]}
          >
            {isPositive ? "▲" : "▼"} {item.pctChange}%
          </Text>
        </View>

      </View>
    );
  };

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>
          Conversor de{"\n"}Moedas PRO
        </Text>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>

        <View style={styles.updateBox}>
          <Text style={{ fontWeight: "bold" }}>Cotação Atual</Text>
          <Text style={{ color: "#777", fontSize: 12 }}>
            Última Atualização: {data}
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {coins.map(renderCard)}
        </ScrollView>

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

  content: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    marginTop: -40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 60,
    paddingHorizontal: 20
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

  flag: {
    width: 28,
    height: 20,
    marginRight: 8,
    borderRadius: 3
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
    color: "#000"
  },

  change: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 4
  },

  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 15,
    marginBottom: 10
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  }
});
