export default `

I have provided an image that is a utility bill.

It's type is either: "electricity" or "gas" or "water"

Please provide me data in JSON format.

Make sure it includes the following properties:
"type" Type of the utility bill (one of the 3 states previously: "electricity", "gas", "water")
"start" The starting date of the accounting period
"end" The ending date of the accounting period
"consumption" The total consumption (do not include the unit of measurement)
“unit” Unit of measurement ("kWh" for electricity, "m3" for gas (cubic meter), "m3" for water (cubic meter) 
“success” If any part of the rest of the JSON can’t be provided then set this to false, otherwise set it to true

When analysing use the English Tesseract even if the language is in a different language than English.

Please give an answer that only has the JSON and nothing else.

`;