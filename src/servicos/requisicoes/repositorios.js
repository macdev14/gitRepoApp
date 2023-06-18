import api from "../api";

export async function pegarRepositoriosDoUsuario(id){
    try{
        const resultado = await api.get(`repos?postId=${id}`);
        return resultado.data;
    }catch(error){
        console.log(error);
        return []
    }

}

export async function salvarRepositoriosDoUsuario(postId, nome, data, id){
    try{
        await api.put(`repos/${id}`,{
            name: nome,
            data:data,
            postId: postId,
            id: id
        });
        return 'sucesso';
    }catch(error){
        console.log(error);
        return 'erro'
    }

}

export async function buscarRepositorio(name, postId){
    try{
        const resultado = await api.get(`repos?postId=${postId}&name=${name}`);
        return resultado.data;
    }catch(error){
        console.log(error);
        return []
    }

}

export async function buscarRepositorioGithub(name, postId){
    try{
        const resultado = await gitApi.get(`users/${name}/repos?name=${name}`);
        return resultado.data;
    }catch(error){
        console.log(error);
        return []
    }

}


export async function criarRepositoriosDoUsuario(postId, nome, data){
    try{
        await api.post(`repos`,{
            postId: postId,
            name: nome,
            data: data,
            
           
        });
        return 'sucesso';
    }catch(error){
        console.log(error);
        return 'erro'
    }

}

export async function deletarRepositorioDoUsuario(id){
    try{
        await api.delete(`repos/${id}`);
        return 'sucesso';
    }catch(error){
        console.log(error);
        return 'erro'
    }

}