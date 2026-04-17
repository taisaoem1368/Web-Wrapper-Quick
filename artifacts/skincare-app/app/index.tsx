import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { WebView } from "react-native-webview";

const WEBAPP_URL = "https://quyen.xyz/";

export default function HomeScreen() {
  const webViewRef = useRef<WebView>(null);
  const [loading, setLoading] = useState(true);

  if (Platform.OS === "web") {
    return (
      <View style={styles.webFallback}>
        <Text style={styles.webTitle}>Đề Cương CSD</Text>
        <Text style={styles.webSub}>
          Ứng dụng này chạy trên iOS & Android.{"\n"}
          Quét mã QR bằng Expo Go để xem trên điện thoại.
        </Text>
        <Text style={styles.webUrl}>{WEBAPP_URL}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: WEBAPP_URL }}
        style={styles.webview}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        allowsBackForwardNavigationGestures={true}
        sharedCookiesEnabled={true}
        thirdPartyCookiesEnabled={true}
        originWhitelist={["*"]}
      />
      {loading && (
        <View style={styles.loadingOverlay} pointerEvents="none">
          <ActivityIndicator size="large" color="#e88fa3" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  webview: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  webFallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff5f7",
    padding: 32,
  },
  webTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#c0607a",
    marginBottom: 16,
    textAlign: "center",
  },
  webSub: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 20,
  },
  webUrl: {
    fontSize: 14,
    color: "#e88fa3",
    textDecorationLine: "underline",
  },
});
