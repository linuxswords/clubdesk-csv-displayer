class CSVConverter {
    constructor(csv_content) {
        this.csv_content = csv_content
    }

    table({ignore_columns = [], include_numbering = false, numbering_prefix='', numbering_postfix='', show_total_only=false, total_title='Total'}){
        var table = '<table>'
        const rows = this.csv_content.split('\n')

        if(show_total_only){
            return `<span class="total_csv_displayer">${total_title}: ${rows.length -1}</span>`
        }

        var ignored_column_indices = []
        for(var row_index = 0; row_index < rows.length; row_index++) {
            const row = rows[row_index]
            table += '<tr>'
            const fields = row.split(';')
            for(var column_index = 0; column_index < fields.length; column_index++){
                const field = fields[column_index]
                
                var tag = 'td'
                if(row_index===0) {
                    tag = 'th'
                    if(ignore_columns.includes(field)){
                        ignored_column_indices.push(column_index)
                    }
                }
                // add row numbering with prefix except for the header row
                if(column_index===0 && include_numbering){
                    const number = row_index > 0 ? row_index : ''
                    const prefix = numbering_prefix && row_index > 0 ? numbering_prefix + ' ' : ''
                    const postfix = numbering_postfix && row_index > 0 ? numbering_postfix : ''
                    table += `<${tag}>${prefix}${number}${postfix}</${tag}>`
                }
                // add column entry if not on ignore list
                if(!ignored_column_indices.includes(column_index)){
                    table += `<${tag}>${field}</${tag}>`
                }
            }
            table += '</tr>'
        }
        table += '</table>'
        return table
    }
}

function loadFileAsTable(targetContainerId, fileId, settings) {
    $.ajax({
      url: "fileservlet?id=" + fileId,
      dataType: "text",
      beforeSend: function(jqXHR) {
        jqXHR.overrideMimeType('text/html;charset=iso-8859-1');
      },
      success: function(data) {
        const clubdesklist_data = data.replace(/[^"]\n/g, '<br/>').replaceAll('\"','');
        table_data = new CSVConverter(clubdesklist_data).table(settings);
        $('#' + targetContainerId).html(table_data);
      },
      error: function(data) {
        $('#' + targetContainerId).html('<div>Fehler beim laden der Daten</div>');
      }
    });
  }


module.exports = {
    CSVConverter:CSVConverter,
    loadFileAsTable
}