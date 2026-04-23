import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const cadastrar = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      alert("Conta criada!");
      navigation.goBack();
    } catch {
      alert("Erro ao cadastrar");
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.box}>
        <Text style={styles.title}>Cadastro</Text>

        <TextInput
          placeholder="Email"
          style={styles.input}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Senha"
          secureTextEntry
          style={styles.input}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.button} onPress={cadastrar}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.link}>Voltar</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2"
  },

  box: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 3
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center"
  },

  input: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10
  },

  button: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center"
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  },

  link: {
    marginTop: 10,
    textAlign: "center",
    color: "#4CAF50"
  }
});