(function ($) {
  $(document).ready(function () {
    const listData = function () {
      $('#list_table tbody').empty();
      $.get('http://localhost:3000/bills', function (result) {
        if (!result.data.length && !result.status) {
          return;
        }

        result.data.forEach(function (bill) {
          let tmp = `<tr>
                            <td>`+ bill.title + `</td>
                            <td>`+ bill.price + `</td>
                            <td>`+ bill.category.name + `</td>
                            <td> <button type='button' class='btn btn-danger' id='removeItem' data-id=`+ bill._id + `>Remover</button> </td>
                          <tr>`
          $('#list_table tbody').append(tmp);
        });

      })
    }
    const populateCategory = function () {
      $.get('http://localhost:3000/categories/', (result) => {
        if (!result.data.length && !result.status) {
          return;
        }

        result.data.forEach(function (category) {
          let tmp = `<option value=` + category._id + `>` + category.name + `</option>`;
          $('#select_category').append(tmp);
        });
      })
    }
    const createDataCat = function () {
      let data = {};
      let category = $('input[name="categoria"]')[0].value;

      if (!category) {
        return
      }

      $('#select_category').empty();
      $('#select_category').append('<option value="0">Selecione</option>');


      data = {
        name: category
      }

      $.post('http://localhost:3000/categories/', data, function (result) {
        let category = $('input[name="categoria"]').val('');
        populateCategory();
        category.focus();
      })
    }
    const createData = function () {
      let data = {};

      let title = $('input[name="title"]')[0].value;
      let price = $('input[name="price"]')[0].value;
      let category = $('#select_category')[0].value;


      if (!title || !price || category === 0) {
        return
      }

      data = {
        title: title,
        price: price,
        category: category
      }

      $.post('http://localhost:3000/bills/', data, function (result) {
        let title = $('input[name="title"]').val('');
        let price = $('input[name="price"]').val('');
        let category = $('#select_category').val(0);

        listData();
        title.focus();
      })
    }
    const deletaData = function () {
      let id = $(this).data('id');

      $.ajax({
        url: 'http://localhost:3000/bills/' + id,
        method: 'DELETE',
        success: function (result) {
          listData();
        }
      })
    }

    listData();
    populateCategory();

    $('#btn_create').on('click', createData);
    $('#btn_create_cat').on('click', createDataCat);
    $('#list_table tbody').on('click', '#removeItem', deletaData);
  });
})(jQuery)