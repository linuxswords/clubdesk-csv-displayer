# clubdesk-csv-displayer

Aka csvtabler: A little javascript helper for clubdesk pages. 

It loads a csv file from the clubdesk server, converts a csv into a html table and places it into the page.

## Use Case

If you fill out a form in clubdesk pages you don't get a confirmation email. So the admins usually post the list of the form entries file.

With this little javascript you can load the file after the page load and, with this script, create an html table andd add it to the page.


## Clubdesk Integration Example

Place the file from the `dist` folder to your owned webpage files.
```html
<head>
 ...   
 <script type="text/javascript" src="wwwfiles/csvtabler.js"></script>
 </head>
```

Now you need the file id of the csv file you want to show on your page. 
The file needs to be publicy accessible for a public page. Let's assume the file id is `1000430`

Now add an `externer Inhalt` block to your page and add following snippet to it:


```html
<div>
	<h3>The title you want</h3>
	<div id="clubdesklist_title_id_you_want">
        The table will be displayed here
	</div>
</div>
<script>
$(document).ready(function(){
    const settings = {ignore_columns:["E-Mail", "Erhalten am", "Bemerkungen"]};
    csvtabler.loadFileAsTable("clubdesklist_title_id_you_want","1000430", settings);
});
</script>

```

Replace _The title you want_ with a title you actually want and change the settings in the code block according to your liking. Without any changes it will display the whole csv with all columns.

## Configuration option

The `loadFileAsTable` function accepts a dictionary with a few options:

| Name                | Type      | Default Value | Description |
| -----------------   | ----------| ------------- | ----------- |
| `ignore_columns`    | list[str] | `[]`          | If provided all columns are ignored when the header row matches an entry in the given array.<br>  If you want to hide the 'Email' and 'Bemerkungen' column you will use ` const settings = {ignore_columns:["Email", "Bemerkungen"]};`
| `include_numbering` | boolean   | `false`       | If `true` a column will be added to the table with numbering starting from 1
| `numbering_prefix`  | string    | `''`          | If set the numbering entry will be prefixed with given argument. Providing `'Team'` will result in `'Team 1'`, `'Team 2'` etc. `include_numbering` must be `true`
| `show_total_only`  | boolean    | `false`          | If set only the total number of rows will be returned.
| `total_title`  | string    | `'Total'`          | Used together with `show_total`. If set it will be used the title. 


## Development

### Todo

* [x] Add code to integrate with html: 1. Load csv by file identifier
* [x] Add code to integrate with html: 2. Add code to load it into a targeted html element
* [x] Add option to output only the total number of rows - header to show the total of 'Anmeldungen' without showing the content
* [ ] Header row configurable -> ATM we assume the first row of the csv contains the header


### Development

`npm install`

TDD! `npm test`

### Build

run `npm run build` and the csvtabler.js file will be generated in the dist folder


## Releases

### 1.0.1 (1.2.2025)

Added options `show_total_only` and `total_title` for showing row count. Use case: how many entries do we have without showing the entries.

### 1.0.0

Initial release
