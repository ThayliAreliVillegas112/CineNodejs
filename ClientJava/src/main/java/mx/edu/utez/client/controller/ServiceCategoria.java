package mx.edu.utez.client.controller;


import mx.edu.utez.client.model.Categoria;
import mx.edu.utez.client.model.CategoriaDao;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import java.util.List;

@Path("/categoria")
public class ServiceCategoria {
    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Categoria> getCategoria(){
        return new CategoriaDao().findAll();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Categoria getCategoria(@PathParam("id") int id){
        return new CategoriaDao().findByCategoriaId(id);
    }

    @POST
    @Path("/save")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes("application/x-www-form-urlencoded")
    public Categoria save(MultivaluedMap<String, String> formParams){
        int id = Integer.parseInt(formParams.get("id").get(0));
        if(new CategoriaDao().save(getParams(id, formParams), true))
            return new CategoriaDao().findByCategoriaId(id);
        return null;
    }


    @POST
    @Path("/save/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes("application/x-www-form-urlencoded")
    public Categoria save(@PathParam("id") int id, MultivaluedMap<String, String> formParams){
        if(new CategoriaDao().save(getParams(id, formParams), false))
            return new CategoriaDao().findByCategoriaId(id);
        return null;
    }

    @DELETE
    @Path("/delete/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public boolean deleteCategoria(@PathParam("id") int id){
        return new CategoriaDao().delete(id);
    }

    private Categoria getParams(int id, MultivaluedMap<String, String> formParams){

        String nombre = formParams.get("nombre").get(0);

        Categoria categoria = new Categoria(id, nombre );
        System.out.println(categoria);
        return categoria;
    }
}
