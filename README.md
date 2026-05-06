# App Cotação de Moedas

Projeto mobile feito com React Native + Firebase.

Funcionalidades:
- Login e cadastro
- Consumo de API de moedas
- Cotação USD e EUR em tempo real

Baixar dependências

- npm install -g expo-cli
- npm install react-native-elements
- npm install @react-navigation/native
- expo install react-native-screens react-native-safe-area-context
- npm install react-native-vector-icons
- npm install @react-navigation/native-stack
- expo install @expo/vector-icons
- npm install --save react-native-screens react-native-safe-area-context
- npm install axios
- npm install firebase

Build com EAS - EXPO

- npm install eas-cli
- eas login
  - E-mail
  - Senha
- eas build:configure
  - yes
  - yes
  - enter
  - ALL
- eas build -p android --profile preview
  - Entra no Link e espera o APK
