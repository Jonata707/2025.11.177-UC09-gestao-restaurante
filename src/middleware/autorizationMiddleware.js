function permitirPerfil(perfisPermitidos){
    let lista = [];
    if(Array.isArray(perfisPermitidos)){
        lista = perfisPermitidos;
    }
    else{
        lista = [perfisPermitidos];
    }

    return (req, res, next) => {
        const perfil = req.usuario && req.usuario.perfil;
        if(lista.includes(perfil)){
            return next();
        }
        return res.status(403).json({msg: "Acesso negado. Perfil não autorizado."});
    }
}

export const autorization = {
    admin : permitirPerfil(['admin']),
    cliente : permitirPerfil(['cliente'])

}

export { permitirPerfil};
export default autorization;