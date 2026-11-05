import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Registro {
  id: string;
  detalle: string;
  hora: string;
}

export default function App() {
  const [contador, setContador] = useState<number>(0);
  const [registros, setRegistros] = useState<Registro[]>([]);

  const registrarEvento = (nuevoValor: number, detalleText: string) => {
    const ahora = new Date();
    const horaFormateada = ahora.toLocaleTimeString();

    setContador(nuevoValor);

    const nuevoRegistro: Registro = {
      id: Date.now().toString() + Math.random().toString(),
      detalle: detalleText,
      hora: horaFormateada,
    };

    setRegistros([nuevoRegistro, ...registros]);
  };

  return (
    <View style={estilos.body}>
      <View style={estilos.container}>
        <Text style={estilos.h1}>Interactividad con el DOM</Text>
        <Text style={estilos.description}>
          Haz clic en el botón para incrementar el contador y registrar la hora
          exacta del evento en la tabla.
        </Text>
        <Text
          style={[
            estilos.counterBox,
            contador > 10 ? estilos.counterAlerta : null,
          ]}
        >
          {contador}
        </Text>

        <TouchableOpacity
          style={estilos.btnClick}
          onPress={() => registrarEvento(contador + 1, `Clic #${contador + 1}`)}
        >
          <Text style={estilos.btnText}>¡Haz Clic Aquí!</Text>
        </TouchableOpacity>

        {}
        <View style={estilos.rowButtons}>
          <TouchableOpacity
            style={estilos.btnMenos}
            onPress={() => {
              if (contador > 0) {
                registrarEvento(contador - 1, `Restó (-1) -> ${contador - 1}`);
              }
            }}
          >
            <Text style={estilos.btnTextSmall}>Restar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={estilos.btnReset}
            onPress={() => registrarEvento(0, "Reinició (0)")}
          >
            <Text style={estilos.btnTextSmall}>Reiniciar</Text>
          </TouchableOpacity>
        </View>

        <View style={estilos.tableContainer}>
          <View style={estilos.tableHeader}>
            <Text style={[estilos.th, estilos.cellNumero]}>Acción / Nº</Text>
            <Text style={[estilos.th, estilos.cellHora]}>Hora</Text>
          </View>

          <ScrollView style={estilos.tableBody}>
            {registros.map((item, index) => (
              <View
                key={item.id}
                style={[estilos.tr, index % 2 === 0 ? estilos.trEven : null]}
              >
                <Text style={[estilos.td, estilos.cellNumero]}>
                  {item.detalle}
                </Text>
                <Text style={[estilos.td, estilos.cellHora]}>{item.hora}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#f4f7f6",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
    padding: 24,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
  },
  h1: {
    color: "#2c3e50",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    color: "#555",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  counterBox: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#3498db",
    marginVertical: 10,
  },
  counterAlerta: {
    color: "#e74c3c",
  },
  btnClick: {
    backgroundColor: "#2ecc71",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 6,
    alignItems: "center",
    shadowColor: "#2ecc71",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 10,
    width: "100%",
  },
  btnText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  rowButtons: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
    marginBottom: 20,
  },
  btnMenos: {
    backgroundColor: "#e67e22",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
    flex: 1,
  },
  btnReset: {
    backgroundColor: "#e74c3c",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
    flex: 1,
  },
  btnTextSmall: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  tableContainer: {
    width: "100%",
    maxHeight: 220,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 6,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tableBody: {
    maxHeight: 170,
  },
  tr: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "#ffffff",
  },
  trEven: {
    backgroundColor: "#fafafa",
  },
  th: {
    color: "#7f8c8d",
    fontWeight: "600",
    fontSize: 14,
    padding: 10,
    textAlign: "center",
  },
  td: {
    color: "#333",
    fontSize: 14,
    padding: 10,
    textAlign: "center",
  },
  cellNumero: {
    flex: 1.2,
  },
  cellHora: {
    flex: 1.3,
  },
});
