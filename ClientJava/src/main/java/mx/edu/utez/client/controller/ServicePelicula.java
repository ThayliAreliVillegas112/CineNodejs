package mx.edu.utez.client.controller;


import mx.edu.utez.client.model.Categoria;
import mx.edu.utez.client.model.Pelicula;
import mx.edu.utez.client.model.PeliculaDao;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import java.util.List;

@Path("/pelicula")
public class ServicePelicula {

    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Pelicula> getCPelicula(){
        return new PeliculaDao().findAll();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Pelicula getPelicula(@PathParam("id") int id){
        return new PeliculaDao().findByPeliculaId(id);
    }

    @POST
    @Path("/save")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes("application/x-www-form-urlencoded")
    public Pelicula save(MultivaluedMap<String, String> formParams){
        int id = Integer.parseInt(formParams.get("id").get(0));
        if(new PeliculaDao().save(getParams(id, formParams), true))
            return new PeliculaDao().findByPeliculaId(id);
        return null;
    }

    @POST
    @Path("/save/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes("application/x-www-form-urlencoded")
    public Pelicula save(@PathParam("id") int id, MultivaluedMap<String, String> formParams){
        if(new PeliculaDao().save(getParams(id, formParams), false))
            return new PeliculaDao().findByPeliculaId(id);
        return null;
    }

    @DELETE
    @Path("/delete/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public boolean deletePelicula(@PathParam("id") int id){
        return new PeliculaDao().delete(id);
    }

    private Pelicula getParams(int id, MultivaluedMap<String, String> formParams){

        String titulo = formParams.get("titulo").get(0);
        String descripcion = formParams.get("descripcion").get(0);
        String sinopsis = formParams.get("sinopsis").get(0);
        int rating = Integer.parseInt(formParams.get("rating").get(0));
        String fechaRegistro = formParams.get("fechaRegistro").get(0);
        String fechaActualizacion = formParams.get("fechaActualizacion").get(0);
        int estado = Integer.parseInt(formParams.get("estado").get(0));
        int categoria = Integer.parseInt(formParams.get("categoria").get(0));

        Pelicula pelicula = new Pelicula(id, titulo,descripcion, sinopsis,rating,fechaRegistro, fechaActualizacion,estado, categoria);
        System.out.println(pelicula);
        return pelicula;
    }

}
