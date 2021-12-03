// GET ID pelicula

const getpeliculaById = async (id) => {
    return await $.ajax({
      type: "GET",
      url: "http://localhost:8080/cinema_war_exploded/pelicula/" + id,
    }).done((res) => res);
  };
  
  // GET ID TO DELETE
  
  const getId = async (id) => {
    document.getElementById("id_delete").value = id;
  };
  
  //DETAILS
  
  const getInfo = async (id) => {
    return await $.ajax({
      type: "GET",
      url: "http://localhost:8080/cinema_war_exploded/pelicula/" + id,
    }).done((res) => {
      let pelicula = res;
      var dateRegister = new Date(pelicula.fechaRegistro).toLocaleString();
      if (pelicula.fehaActualizacion == null) {
        var dateUpdate = "Aún no hay actualizaciones";
      } else {
        var dateUpdate = new Date(pelicula.fechaActualizacion).toLocaleString();
      }
      document.getElementById("titulo").value = pelicula.titulo;
      document.getElementById("descripcion").value = pelicula.descripcion;
      document.getElementById("sinopsis").value = pelicula.sinopsis;
      document.getElementById("rating").value = pelicula.rating;
      document.getElementById("fechaRegistro").value = dateRegister;
      document.getElementById("fechaActualizacion").value = dateUpdate;
      document.getElementById("estado").value = pelicula.estado ? "Activo": "Inactivo";
      document.getElementById("categoria").value = pelicula.categoria;
    });
  };
  
  //GET UDPATE DETAILS
  
  const getInfoUpdate = async (id) => {
    return await $.ajax({
      type: "GET",
      url: "http://localhost:8080/cinema_war_exploded/pelicula/" + id,
    }).done((res) => {
      let pelicula = res;
      var dateRegister = new Date(pelicula.fechaRegistro).toLocaleString();
      if (pelicula.fechaActualizacion == null) {
        var dateUpdate = "Aún no hay actualizaciones";
      } else {
        var dateUpdate = new Date(pelicula.fechaActualizacion).toLocaleString();
      }
  
      document.getElementById("id_update").value = id;
      document.getElementById("titulo_update").value = pelicula.titulo;
      document.getElementById("descripcion_update").value = pelicula.descripcion;
      document.getElementById("sinopsis_update").value = pelicula.sinopsis;
      document.getElementById("rating_update").value = pelicula.rating;
      document.getElementById("fechaRegistro_update").value = dateRegister;
      document.getElementById("fechaActualizacion_update").value = dateUpdate;
      document.getElementById("estado_update").value = pelicula.estado;
      document.getElementById("categoria_update").value = pelicula.categoria;
    });
  };
  
  //FILL TABLE peliculaS
  
  const getPelicula = () => {
    $.ajax({
      type: "GET",
      headers: { Accept: "application/json" },
      url: "http://localhost:8080/cinema_war_exploded/pelicula",
    }).done((res) => {
      let listPelicula = res;
  
      let table = "";
  
      if (listPelicula.length > 0) {
        for (let i = 0; i < listPelicula.length; i++) {
          var dateRegister = new Date(listPelicula[i].fechaRegistro).toLocaleString();
          if (listPelicula[i].fechaActualizacion == null) {
            var dateUpdate = "No ha habido actualización";
          } else {
            var dateUpdate = new Date(listPelicula[i].fechaActualizacion).toLocaleString();
          }
  
          table += `
              <tr>
                  <td>${i + 1}</td>
                  <td>${listPelicula[i].titulo}</td>
                  <td>${listPelicula[i].descripcion}</td>
                  <td>${listPelicula[i].sinopsis}</td>
                  <td>${listPelicula[i].rating}</td>
                  <td>${dateRegister}</td>
                  <td>${dateUpdate}</td>
                  <td>${listPelicula[i].estado ? "Activo" : "Inactivo"}</td>
                  <td>${listPelicula[i].categoria}</td>
                  <td style="text-align: center;">
                      <button type="button" onclick= getInfo(${
                        listPelicula[i].id
                      }) class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#details"><i class="fa fa-align-left" aria-hidden="true"></i> Detalles</button>
                  </td>
                  <td style="text-align: center;">
                  <button type="button" onclick= getInfoUpdate(${
                    listPelicula[i].id
                  }) class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#update"><i class="fa fa-edit" aria-hidden="true"></i> Modificar</button>
                  </td>
                  <td style="text-align: center;">
                  <button type="button" onclick= getId(${
                    listPelicula[i].id
                  }) class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delete"><i class="fa fa-chevron-down" aria-hidden="true"></i> Eliminar</button>                
                  </td>
              </tr>
              `;
        }
      } else {
        table = `
          <tr class="text-center">
              <td colspan="5">Sin registros :( </td>
          </tr>
          `;
      }
      $(`#table > tbody`).html(table);
    });
  };
  
  //UPDATE pelicula
  
  const updatePelicula = async () => {

    let pelicula = new Object();
    let id = document.getElementById("id_update").value;
    pelicula.titulo = document.getElementById("titulo_update").value;
    pelicula.descripcion = document.getElementById("descripcion_update").value;
    pelicula.sinopsis = document.getElementById("sinopsis_update").value;
    pelicula.fechaActualizacion = new Date().toLocaleString();
    pelicula.rating = document.getElementById("rating_update").value;
    pelicula.estado = document.getElementById("estado_update").value;
    pelicula.categoria = document.getElementById("categoria_update").value;
  
    $.ajax({
      type: "POST",
      url: "http://localhost:8080/cinema_war_exploded/pelicula/save/" + id,
      data: pelicula
    }).done(res => {
        console.log(pelicula);
      getpeliculas();
    });
  };
  
  // DELETE pelicula
  
  const deletePelicula = async () => {
    let id = document.getElementById("id_delete").value;
    await $.ajax({
      type: "POST",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
      },
      url: "http://localhost:8080/cinema_war_exploded/pelicula/delete/" + id,
    }).done((res) => {
        console.log(res);
      getpeliculas();
    });
  };
  
  //REGISTER pelicula
  
  const registerPelicula = async() => {
    let pelicula = new Object();  
    pelicula.titulo = document.getElementById("titulo_register").value;
    pelicula.descripcion = document.getElementById("descripcion_register").value;
    pelicula.sinopsis = document.getElementById("sinopsis_register").value;
    pelicula.rating = document.getElementById("rating_register").value;
    pelicula.fechaRegistro = new Date();
    pelicula.estado = 1;
    pelicula.categoria = document.getElementById("categoria_register").value;
  
  await $.ajax({
      type: "POST",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
      },
      url: "http://localhost:8080/cinema_war_exploded/pelicula/save/",
      data: pelicula
    }).done(res => {
      getpeliculas();
      document.getElementById("titulo_register").value = "";
      document.getElementById("descripcion_register").value = "";
      document.getElementById("sinopsis_register").value = "";
      document.getElementById("rating_register").value = "";
      document.getElementById("categoria_register").value = "";
    });
  };
  
  getPelicula();