package mx.edu.utez.client.model;

import mx.edu.utez.client.database.ConnectionMysql;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class PeliculaDao {

    private Connection con;
    private CallableStatement cstm;
    private ResultSet rs;
    PreparedStatement pstm;

    public List<Pelicula> findAll(){
        List<Pelicula> listPelicula = new ArrayList<>();

        try{
            con = ConnectionMysql.getConnection();
            cstm = con.prepareCall("SELECT * FROM pelicula;");
            rs = cstm.executeQuery();

            while(rs.next()){
                Pelicula pelicula = new Pelicula();

                pelicula.setId(rs.getInt("id"));
                pelicula.setTitulo(rs.getString("titulo"));
                pelicula.setDescripcion(rs.getString("descripcion"));
                pelicula.setSinopsis(rs.getString("sinopsis"));
                pelicula.setRating(rs.getInt("rating"));
                pelicula.setFechaRegistro(rs.getString("fechaRegistro"));
                pelicula.setFechaActualizacion(rs.getString("fechaActualizacion"));
                pelicula.setEstado(rs.getInt("estado"));
                pelicula.setCategoria(rs.getInt("categoria"));
                listPelicula.add(pelicula);
            }
        }catch(SQLException ex){
            ex.printStackTrace();
        }finally{
            closeConnection();
        }
        return listPelicula;
    }

    public Pelicula findByPeliculaId(int id){
        Pelicula pelicula = null;

        try{
            con = ConnectionMysql.getConnection();
            cstm = con.prepareCall("SELECT * FROM pelicula WHERE id = ?;");
            cstm.setInt(1, id);
            rs = cstm.executeQuery();

            if(rs.next()){
                pelicula = new Pelicula();

                pelicula.setId(rs.getInt("id"));
                pelicula.setTitulo(rs.getString("titulo"));
                pelicula.setDescripcion(rs.getString("descripcion"));
                pelicula.setSinopsis(rs.getString("sinopsis"));
                pelicula.setRating(rs.getInt("rating"));
                pelicula.setFechaRegistro(rs.getString("fechaRegistro"));
                pelicula.setFechaActualizacion(rs.getString("fechaActualizacion"));
                pelicula.setEstado(rs.getInt("estado"));
                pelicula.setCategoria(rs.getInt("categoria"));

            }
        }catch(SQLException ex){
            ex.printStackTrace();
        }finally{
            closeConnection();
        }
        return pelicula;
    }

    public boolean save(Pelicula pelicula, boolean isCreate){
        boolean flag = false;

        try{
            con = ConnectionMysql.getConnection();
            if(isCreate){
                cstm = con.prepareCall("INSERT INTO pelicula (id,titulo, descripcion, sinopsis, rating, fechaRegistro, fechaActualizacion, estado, categoria)VALUES(?,?,?,?,?,?,?,?,?);");

                cstm.setInt(1, pelicula.getId());
                cstm.setString(2, pelicula.getTitulo());
                cstm.setString(3, pelicula.getDescripcion());
                cstm.setString(4, pelicula.getSinopsis());
                cstm.setInt(5, pelicula.getRating());
                cstm.setString(6, pelicula.getFechaRegistro());
                cstm.setString(7, pelicula.getFechaActualizacion());
                cstm.setInt(8,pelicula.getEstado());
                cstm.setInt(9,pelicula.getCategoria());

            } else {
                cstm = con.prepareCall("UPDATE pelicula SET titulo = ?, descripcion = ?, sinopsis = ?, rating = ?, fechaRegistro = ?, fechaActualizacion = ?, estado = ?, categoria = ? WHERE id = ?;");

                cstm.setString(1, pelicula.getTitulo());
                cstm.setString(2, pelicula.getDescripcion());
                cstm.setString(3, pelicula.getSinopsis());
                cstm.setInt(4, pelicula.getRating());
                cstm.setString(5, pelicula.getFechaRegistro());
                cstm.setString(6, pelicula.getFechaActualizacion());
                cstm.setInt(7,pelicula.getEstado());
                cstm.setInt(8,pelicula.getCategoria());
            }
            flag = cstm.executeUpdate() == 1;
        }catch(SQLException ex){
            ex.printStackTrace();
        }finally{
            closeConnection();
        }
        return flag;
    }

    public boolean delete(int id){
        boolean flag = false;

        try{
            con = ConnectionMysql.getConnection();
            cstm = con.prepareCall("DELETE FROM pelicula WHERE id = ?;");
            cstm.setInt(1, id);
            flag = cstm.executeUpdate() == 1;
        }catch(SQLException ex){
            ex.printStackTrace();
        }finally{
            closeConnection();
        }
        return flag;
    }
    public void closeConnection() {
        try {
            if (con != null) {
                con.close();
            }
            if (pstm != null) {
                pstm.close();
            }
            if (rs != null) {
                rs.close();
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }
}
