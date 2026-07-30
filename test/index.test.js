const CSVConverter = require('../src/index').CSVConverter;
const expect = require('chai').expect;

describe('Testing the CSVConverter', function(){
    it('1. Convert simple csv to html table', function(done){
        const csv_data = 'Name;First Name\nBeutlin;Frodo'
        const csv_converter = new CSVConverter(csv_data)
        
        expect(csv_converter.table({})).to.equal(
            '<table>'+
            '<tr><th>Name</th><th>First Name</th></tr>'+
            '<tr><td>Beutlin</td><td>Frodo</td></tr>'+
            '</table>')
        done()
    })


    it('2. Ignores a single column', function(done){
        const csv_data = 'Name;First Name;Race\nBeutlin;Frodo;Hobbit'
        const csv_converter = new CSVConverter(csv_data)
        
        expect(csv_converter.table({ignore_columns:['Race']})).to.equal(
            '<table>'+
            '<tr><th>Name</th><th>First Name</th></tr>'+
            '<tr><td>Beutlin</td><td>Frodo</td></tr>'+
            '</table>')
        done()
    })



    it('3. Ignores multiple columns', function(done){
        const csv_data = 'Name;First Name;Race\nBeutlin;Frodo;Hobbit'
        const csv_converter = new CSVConverter(csv_data)
        
        expect(csv_converter.table({ignore_columns:['Race', 'Name']})).to.equal(
            '<table>'+
            '<tr><th>First Name</th></tr>'+
            '<tr><td>Frodo</td></tr>'+
            '</table>')
        done()
    })

    it('4. includes numbering', function(done){
        const csv_data = 'Name;First Name\nBeutlin;Frodo'
        const csv_converter = new CSVConverter(csv_data)
        
        expect(csv_converter.table({include_numbering:true})).to.equal(
            '<table>'+
            '<tr><th></th><th>Name</th><th>First Name</th></tr>'+
            '<tr><td>1</td><td>Beutlin</td><td>Frodo</td></tr>'+
            '</table>')
        done()
    })



    it('4.5 includes numbering postfix', function(done){
        const csv_data = 'Name;First Name\nBeutlin;Frodo'
        const csv_converter = new CSVConverter(csv_data)
        
        expect(csv_converter.table({include_numbering:true, numbering_postfix: '.'})).to.equal(
            '<table>'+
            '<tr><th></th><th>Name</th><th>First Name</th></tr>'+
            '<tr><td>1.</td><td>Beutlin</td><td>Frodo</td></tr>'+
            '</table>')
        done()
    })


    it('5. includes numbering with prefix', function(done){
        const csv_data = 'Name;First Name\nBeutlin;Frodo'
        const csv_converter = new CSVConverter(csv_data)
        
        expect(csv_converter.table({include_numbering:true, numbering_prefix: 'Team'})).to.equal(
            '<table>'+
            '<tr><th></th><th>Name</th><th>First Name</th></tr>'+
            '<tr><td>Team 1</td><td>Beutlin</td><td>Frodo</td></tr>'+
            '</table>')
        done()
    })



    it('5.5 includes numbering with prefix and postfix', function(done){
        const csv_data = 'Name;First Name\nBeutlin;Frodo'
        const csv_converter = new CSVConverter(csv_data)
        
        expect(csv_converter.table({include_numbering:true, numbering_prefix: 'Team', numbering_postfix: '.'})).to.equal(
            '<table>'+
            '<tr><th></th><th>Name</th><th>First Name</th></tr>'+
            '<tr><td>Team 1.</td><td>Beutlin</td><td>Frodo</td></tr>'+
            '</table>')
        done()
    })
    

    it('6. show only total of entries', function(done){
        const csv_data = 'Name;First Name\nBeutlin;Frodo\nSamwise;Gamgee'
        const csv_converter = new CSVConverter(csv_data)
        
        expect(csv_converter.table({show_total_only: true})).to.equal(
            '<span class="total_csv_displayer">Total: 2</span>')
        done()
    })

    it('7. show only total of entries with respect of title', function(done){
        const csv_data = 'Name;First Name\nBeutlin;Frodo\nSamwise;Gamgee'
        const csv_converter = new CSVConverter(csv_data)

        expect(csv_converter.table({show_total_only: true, total_title: 'Anzahl Anmeldungen'})).to.equal(
            '<span class="total_csv_displayer">Anzahl Anmeldungen: 2</span>')
        done()
    })

    it('8. include_only_if_true renders only rows whose column is truthy', function(done){
        const csv_data = 'Name;Active\nBeutlin;true\nGamgee;false\nGandalf;1'
        const csv_converter = new CSVConverter(csv_data)

        expect(csv_converter.table({include_only_if_true: 'Active'})).to.equal(
            '<table>'+
            '<tr><th>Name</th><th>Active</th></tr>'+
            '<tr><td>Beutlin</td><td>true</td></tr>'+
            '<tr><td>Gandalf</td><td>1</td></tr>'+
            '</table>')
        done()
    })

    it('9. include_only_if_true ignores truthy values in other columns', function(done){
        const csv_data = 'Name;Paid;Active\nBeutlin;true;true\nGamgee;true;false\nGandalf;false;1'
        const csv_converter = new CSVConverter(csv_data)

        expect(csv_converter.table({include_only_if_true: 'Active'})).to.equal(
            '<table>'+
            '<tr><th>Name</th><th>Paid</th><th>Active</th></tr>'+
            '<tr><td>Beutlin</td><td>true</td><td>true</td></tr>'+
            '<tr><td>Gandalf</td><td>false</td><td>1</td></tr>'+
            '</table>')
        done()
    })

    it('10. include_only_if_true treats german Ja/Nein values as true/false', function(done){
        const csv_data = 'Name;Aktiv\nBeutlin;Ja\nGamgee;Nein\nGandalf;ja'
        const csv_converter = new CSVConverter(csv_data)

        expect(csv_converter.table({include_only_if_true: 'Aktiv'})).to.equal(
            '<table>'+
            '<tr><th>Name</th><th>Aktiv</th></tr>'+
            '<tr><td>Beutlin</td><td>Ja</td></tr>'+
            '<tr><td>Gandalf</td><td>ja</td></tr>'+
            '</table>')
        done()
    })

    it('11. include_only_if_true matches truthy values case-insensitively', function(done){
        const csv_data = 'Name;Aktiv\nBeutlin;JA\nGamgee;NEIN\nGandalf;TRUE\nBaggins;YES\nMerry;X'
        const csv_converter = new CSVConverter(csv_data)

        expect(csv_converter.table({include_only_if_true: 'Aktiv'})).to.equal(
            '<table>'+
            '<tr><th>Name</th><th>Aktiv</th></tr>'+
            '<tr><td>Beutlin</td><td>JA</td></tr>'+
            '<tr><td>Gandalf</td><td>TRUE</td></tr>'+
            '<tr><td>Baggins</td><td>YES</td></tr>'+
            '<tr><td>Merry</td><td>X</td></tr>'+
            '</table>')
        done()
    })
})