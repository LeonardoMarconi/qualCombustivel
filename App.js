import React, {useState, useRef} from 'react';
import { SafeAreaView, View, Image, StyleSheet, Modal, Text,Keyboard, TextInput, Linking, TouchableOpacity } from 'react-native';

export default function App() {

  const [vlrAlcool,setVlrAlcool] = useState('');
  const [vlrGasolina, setVlrGasolina] = useState('');
  const [combustivel, setCombustivel] = useState('');
  const [visibleModal, setVisibleModal] = useState(false);

  const inputRef = useRef(null);

  function calcular(){
    Keyboard.dismiss();
    if(vlrAlcool === '' || vlrGasolina === ''){
      alert('Por favor, preencha os valores p/ ltr do Álcool e Gasolina');
      return;
    }
    let resultado = (vlrAlcool/vlrGasolina);
    if(resultado > 0.70){
      setCombustivel('Gasolina')
    }else{
      setCombustivel('Álcool')
    }
    setVisibleModal(true);
  }

  function voltar(){
    setVlrAlcool('');
    setVlrGasolina('');
    setCombustivel('');
    setVisibleModal(false);
    inputRef.current.focus();
  }

 return (
   <SafeAreaView style={styles.container}>
    <View style={styles.logo}>
      <Image 
        source={require('./src/images/logo.png')}
        style={styles.imagemLogo}
      />
      <Text style={styles.titulo}>Qual Combustível ?</Text>
    </View>
    <View style={styles.areaInput}>
      <Text style={styles.textoInput}>Álcool (R$ Preço por Litro):</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex. 3.89"
        keyboardType='numeric'
        value={vlrAlcool}
        onChangeText={(valor)=> setVlrAlcool(valor)}
        ref={inputRef}
      />
      <Text style={styles.textoInput}>Gasolina (R$ Preço por Litro):</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex. 4.99"
        keyboardType='numeric'
        value={vlrGasolina}
        onChangeText={(valor)=> setVlrGasolina(valor)}
      />
      <TouchableOpacity style={styles.botao} onPress={calcular}>
        <Text style={{fontSize:25, color:'#000', fontWeight:'bold'}}>Calcular</Text>
      </TouchableOpacity>
    </View>
    <Text 
      style={styles.creditos} 
      onPress={() => { 
        Linking.openURL('https://leonardomarconi.github.io'); 
      }}
    >
       Made with ❤ by Leonardo Marconi
    </Text>

    <Modal style={styles.modal} transparent={true} animationType='slide' visible={visibleModal}>
      <View style={styles.modalContainer}>

        <Image 
          source={require('./src/images/fuel.png')}
          style={styles.imagemLogo}
        />
        
        <Text style={styles.resultado}> Compensa usar {combustivel}</Text>
        <Text style={styles.descricao}>Com os Preços:</Text>
        <Text style={styles.valores}>Álcool R$ {vlrAlcool}</Text>
        <Text style={styles.valores}>Gasolina R$ {vlrGasolina}</Text>
        <Text style={styles.valores}>-------------------------</Text>
        <Text style={styles.valores}>Resultado {(vlrAlcool/vlrGasolina).toFixed(2)} - ({((vlrAlcool/vlrGasolina)*100).toFixed(0)} %)</Text>

        <TouchableOpacity style={styles.btnVoltar} onPress={voltar}>
          <Text style={{color:'#fff', fontSize:16, fontWeight:'bold'}}>Calcular Novamente</Text>
        </TouchableOpacity>

      </View>
    </Modal>

   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#1a1b41',
    justifyContent:'center',
    alignItems:'center'
  },
  logo:{
    padding:15,
    alignItems:'center',
    justifyContent:'center'
  },
  imagemLogo:{
    width:180,
    height:180,
    backgroundColor:'#fff',
    borderRadius:25,
    borderColor:'#baff29',
    borderWidth:3
  },
  titulo:{
    color:'#fff',
    fontSize:30,
    fontWeight:'bold',
    marginTop:20
  },
  textoInput:{
    fontSize:20,
    fontWeight:'bold',
    color:'#fff',
    marginBottom: 9,
    marginTop:20
  },
  areaInput:{
    width:'90%',
    padding:15,
  },
  input:{
    fontSize:20,
    borderWidth:1,
    borderColor:'#baff29',
    backgroundColor:'#fff',
    color:'#121212',
    borderRadius:10,
    borderWidth:2
  },
  botao:{
    padding:10,
    backgroundColor:'#baff29',
    marginTop:25,
    borderRadius:15,
    justifyContent:'center',
    alignItems:'center'
  },
  creditos:{
    justifyContent:'flex-end',
    alignItems:'flex-end',
    color:'#fff',
    fontSize:12,
    marginTop:20
  },
  modalContainer:{
    height:'100%',
    width:'100%',
    backgroundColor:'#efffc8',
    justifyContent:'center',
    alignItems:'center'
    
  },
  btnVoltar:{
    backgroundColor:'#85cb33',
    padding:10,
    borderRadius:10,
    marginTop:40
  },
  resultado:{
    color:'#f40000',
    fontSize:30,
    fontWeight:'bold',
    marginTop:25,
    marginBottom:25,
    padding:10
  },
  descricao:{
    fontSize:22,
    color:'#1a1b41',
    fontWeight:'bold'
  },
  valores:{
    fontSize:20,
    color:'#1a1b41',
  }
})