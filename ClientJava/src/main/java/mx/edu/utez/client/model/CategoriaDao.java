package mx.edu.utez.client.model;

import mx.edu.utez.client.database.ConnectionMysql;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class CategoriaDao {

    private Connection con;
    private CallableStatement cstm;
    private ResultSet rs;
    PreparedStatement pstm;

    public List<Categoria> findAll(){
        List<Categoria> listCategoria = new ArrayList<>();

        try{
            con = ConnectionMysql.getConnection();
            cstm = con.prepareCall("SELECT * FROM categoria;");
            rs = cstm.executeQuery();

            while(rs.next()){
                Categoria categoria = new Categoria();

                categoria.setId((rs.getInt("id")));
                categoria.setNombre(rs.getString("nombre"));

                listCategoria.add(categoria);
            }
        }catch(SQLException ex){
            ex.printStackTrace();
        }finally{
            closeConnection();
        }
        return listCategoria;
    }

    public Categoria findByCategoriaId(int id){
        Categoria categoria = null;

        try{
            con = ConnectionMysql.getConnection();
            cstm = con.prepareCall("SELECT * FROM categoria WHERE id = ?;");
            cstm.setInt(1, id);
            rs = cstm.executeQuery();

            if(rs.next()){
                categoria = new Categoria();
                categoria.setId(rs.getInt("id"));
                categoria.setNombre(rs.getString("nombre"));
            }
        }catch(SQLException ex){
            ex.printStackTrace();
        }finally{
            closeConnection();
        }
        return categoria;
    }

    public boolean save(Categoria categoria, boolean isCreate){
        boolean flag = false;

        try{
            con = ConnectionMysql.getConnection();
            if(isCreate){
                cstm = con.prepareCall("INSERT INTO categoria ( id, nombre )VALUES(?, ?);");

                cstm.setInt(1, categoria.getId());
                cstm.setString(2, categoria.getNombre());

            } else {
                cstm = con.prepareCall("UPDATE categoria SET nombre = ?  WHERE id = ?;");

                cstm.setString(1, categoria.getNombre());
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
            cstm = con.prepareCall("DELETE FROM categoria WHERE id = ?;");
            cstm.setInt(1, id);
            flag = cstm.executeUpdate() == 1;
        }catch(SQLException ex){
            ex.printStackTrace();
        }finally{
            closeConnection();
        }
        return flag;
    }


    public void closeConnection(){
        try{
            if(con != null){
                con.close();
            }
            if(pstm != null){
                pstm.close();
            }
            if(rs != null){
                rs.close();
            }
        }catch(SQLException ex){
            ex.printStackTrace();
        }
    }
}
