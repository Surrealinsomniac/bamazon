var Table = require("cli-table2");

var displayTable = function() {
    this.table = new Table ({
        head: ["Item ID", "Product Name", "Department Name", "Price", "Stock"],
    });
    this.displayInventory = function(results) {
        this.results = results;
        for (var i = 0; i < this.results.length; i ++) {
            this.table.push(
                [this.results[i].id, this.results[i].product_name, this.results[i].department_name, this.results[i].price, this.results[i].stock]
            );
        }
       console.log("\n" + this.table.toString()); 
    };
}
module.exports = displayTable;
