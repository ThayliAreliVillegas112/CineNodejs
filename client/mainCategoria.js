// GET ID categoria

const getCategoriaByIdCategoria = async (id) => {
    return await $.ajax({
      type: "GET",
      url: "http://localhost:8080/cinema_war_exploded/categoria/" + id,
    }).done((res) => res);
  };
  
  // GET ID TO DELETE
  
  const getIdCategoria = async (id) => {
    document.getElementById("id_delete").value = id;
  };
  
  //DETAILS
  
  const getInfoCategoria = async (id) => {
    return await $.ajax({
      type: "GET",
      url: "http://localhost:8080/cinema_war_exploded/categoria/" + id,
    }).done((res) => {
      
      document.getElementById("nombre").value = categoria.nombre;
      
    });
  };
  
  //GET UDPATE DETAILS
  
  const getInfoUpdateCategoria = async (id) => {
    return await $.ajax({
      type: "GET",
      url: "http://localhost:8080/cinema_war_exploded/categoria/" + id,
    }).done((res) => {
      let categoria = res;
  
      document.getElementById("id_update").value = id;
      document.getElementById("nombre_update").value = categoria.titulo;
      
    });
  };
  
  //tabla categoria
  
  const getCategoria = () => {
    $.ajax({
      type: "GET",
      headers: { Accept: "application/json" },
      url: "http://localhost:8080/cinema_war_exploded/categoria",
    }).done((res) => {
      let listCategoria = res;
  
      let table2 = "";
  
      if (listCategoria.length > 0) {
        for (let i = 0; i < listCategoria.length; i++) {
  
          table2 += `
              <tr>
                  <td>${i + 1}</td>
                  <td>${listCategoria[i].nombre}</td>

                  <td style="text-align: center;">
                      <button type="button" onclick= getInfoCategoria(${
                        listCategoria[i].id
                      }) class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#details2"><i class="fa fa-align-left" aria-hidden="true"></i> Detalles</button>
                  </td>
                  <td style="text-align: center;">
                  <button type="button" onclick= getInfoUpdateCategoria(${
                    listCategoria[i].id
                  }) class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#update2"><i class="fa fa-edit" aria-hidden="true"></i> Modificar/button>
                  </td>
                  <td style="text-align: center;">
                  <button type="button" onclick= getIdCategoria(${
                    listCategoria[i].id
                  }) class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delete2"><i class="fa fa-chevron-down" aria-hidden="true"></i> Eliminar</button>                
                  </td>
              </tr>
              `;
        }
      } else {
        table2 = `
          <tr class="text-center">
              <td colspan="5">Sin registros :( </td>
          </tr>
          `;
      }
      $(`#table > tbody`).html(table2);
    });
  };
  
  //UPDATE categoria
  
  const updateCategoria = async () => {

    let categoria = new Object();

    let id = document.getElementById("id_update").value;
    categoria.nombre = document.getElementById("nombre_update").value;
    
    $.ajax({
      type: "POST",
      url: "http://localhost:8080/cinema_war_exploded/categoria/save/" + id,
      data: categoria
    }).done(res => {
        console.log(categoria);
      getcategorias();
    });
  };
  
  // DELETE categoria
  
  const deleteCategoria = async () => {
    let id = document.getElementById("id_delete").value;
    await $.ajax({
      type: "POST",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
      },
      url: "http://localhost:8080/cinema_war_exploded/categoria/delete/" + id,
    }).done((res) => {
        console.log(res);
      getcategorias();
    });
  };
  
  //REGISTER categoria
  
  const registerCategoria = async() => {
    let categoria = new Object();  
    categoria.nombre = document.getElementById("nombre_register").value;
    
  
  await $.ajax({
      type: "POST",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
      },
      url: "http://localhost:8080/cinema_war_exploded/categoria/save/",
      data: categoria
    }).done(res => {
      getcategorias();
      document.getElementById("nombre_register").value = "";
    });
  };
  
  getCategoria();