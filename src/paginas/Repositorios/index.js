import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TextInput ,TouchableOpacity, Alert } from 'react-native';
import estilos from './estilos';
import { buscarRepositorio, pegarRepositoriosDoUsuario } from '../../servicos/requisicoes/repositorios';
import { useIsFocused } from '@react-navigation/native';

export default function Repositorios({ route, navigation }) {
    const [repo, setRepo] = useState([]);
    const [nomeRepo, setNomeRepo] = useState('');
    const estaNaTela = useIsFocused();
    
    useEffect( ()=>{
        const obterResultado = async ()=>{
      const resultado = await pegarRepositoriosDoUsuario(route.params.id)  
        setRepo(resultado);
        }
        obterResultado();


    }, [estaNaTela])

    const buscar=async()=>{
        const resultado = await buscarRepositorio(nomeRepo, route.params.id);
        if(resultado.length===0){
            Alert.alert('Nenhum repositorio encontrado')
        }
        else{
        setRepo(resultado)
        setNomeRepo('')
        }
    }


    return (

        <View style={estilos.container}>
              
            
                <Text style={estilos.repositoriosTexto}>{repo.length} repositórios criados</Text>
                <TouchableOpacity 
                    style={estilos.botao}
                    onPress={() => navigation.navigate('CriarRepositorio', {id: route.params.id})}
                >
                    <Text style={estilos.textoBotao}>Adicionar novo repositório</Text>
                </TouchableOpacity>

                <TextInput
                    placeholder="Busque por um repositorio"
                    autoCapitalize="none"
                    style={estilos.entrada}
                    value={nomeRepo}
                    onChangeText={setNomeRepo}
                />

                <TouchableOpacity style={estilos.botao}
                onPress={buscar}
                >
                    <Text style={estilos.textoBotao}>
                        Buscar
                    </Text>
                </TouchableOpacity>
                <FlatList data={repo} style={{width:'100%'}} keyExtractor={repo=>repo.id}
                renderItem={({item})=>(
                    <TouchableOpacity style={estilos.repositorio}
                    onPress={()=>navigation.navigate('InfoRepositorio', {item})}
                    >
                        <Text style={estilos.repositorioNome}>{item.name}</Text>
                        <Text style={estilos.repositorioData}> Atualizado em {item.data} </Text>
                    </TouchableOpacity>
                )}
                
                />

        </View>
    );
}
