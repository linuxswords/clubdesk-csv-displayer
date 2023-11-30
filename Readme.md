# clubdesk-csv-displayer

A little javascript helper for clubdesk pages. 

It converts a csv into a html table.

## Use Case

If you fill out a form in clubdesk pages you don't get a confirmation email. So the admins usually post the list of the form entries file.

With a little javascript you can load the file after the page load and, with this script, create an html table andd add it to the page.


### Usage

Create an instance of the `CSVConverter` class with the csv content as an argument. Call the `table` function and 
receive a string back which contains a html table.

```javascript
const csv_data = load_it_from_somewhere(clubdesk_server)
const csv_converter = new CSVConverter(csv_data)
const html_table = csv_converter.table()
// place it in your dom

```



The table function accepts a dictionary with a few options:

| Name                | Type      | Default Value | Description |
| -----------------   | ----------| ------------- | ----------- |
| `ignore_columns`    | list[str] | `[]`          | If provided all columns are ignored when the header row matches an entry in the given array  
| `include_numbering` | boolean   | `false`       | If `true` a column will be added to the table with numbering starting from 1
| `numbering_prefix`  | string    | `''`          | If set the numbering entry will be prefixed with given argument. Providing `'Team'` will result in `'Team 1'`, `'Team 2'` etc. `include_numbering` must be `true`



## Todo

* [ ] Add code to integrate with html: 1. Load csv by file identifier
* [ ] Add code to integrate with html: 2. Add code to load it into a targeted html element
* [ ] Header row configurable -> ATM we assume the first row of the csv contains the header


## Development

TDD! `npm test`