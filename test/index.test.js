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
})