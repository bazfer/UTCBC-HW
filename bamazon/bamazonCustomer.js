var mysql = require('mysql')
var inquirer = require('inquirer')

// SQL connection options
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: "root",
    password: '',
    database: 'bamazon_db'
})

// establish connection to SQL DB
connection.connect(function (err) {
    if (err) throw err;
    console.log('connected as id' + connection.threadId)
})

// build store object
function Store() {
    this.products;

    this.buyItem = function (itemId, itemQty, stock, price) {
        let qt = "UPDATE products SET stock_qty = stock_qty - " + itemQty + " WHERE item_id = " + itemId
        connection.query(qt, function () {
            console.log("Thank you for your purchase. Your total was $" + itemQty * price)
            // console logging the updated stock
            console.log(itemId, itemQty, stock, price)
        })
    }

    this.checkWarehouse = function (itemId, itemQty) {
        var price;
        var stock;
        let qt = 'SELECT * FROM products WHERE ?'
        connection.query(qt, {
                item_id: itemId
            },
            function (err, res) {
                if (err)
                    console.log(err)
                else {
                    stock = res[0].stock_qty
                    if (res[0].stock_qty < itemQty)
                        console.log("Sorry, there are not enough items in the warehouse to fulfill your order")
                    else {
                        price = res[0].price;
                        store.buyItem(itemId, itemQty, stock, price)
                    }
                }
            })
    }

    // ask user for item id and quantity to buy
    this.promptUser = function () {
        var itemId;
        var itemQty;
        inquirer.prompt({
            name: 'id',
            type: 'input',
            message: 'Enter the item id of the product you want to buy?'
        }).then(function (answer) {
            itemId = answer.id;
            inquirer.prompt({
                name: "qty",
                type: 'input',
                message: 'How many units do you wish to buy?'
            }).then(function (answer) {
                itemQty = answer.qty;
                store.checkWarehouse(itemId, itemQty)
            })
        })
    }


    // display table
    this.displayProducts = function () {
        function rowHeights(rows) {
            return rows.map(function (row) {
                return row.reduce(function (max, cell) {
                    return Math.max(max, cell.minHeight());
                }, 0);
            });
        }

        function colWidths(rows) {
            return rows[0].map(function (_, i) {
                return rows.reduce(function (max, row) {
                    return Math.max(max, row[i].minWidth());
                }, 0);
            });
        }

        function drawTable(rows) {
            var heights = rowHeights(rows);
            var widths = colWidths(rows);

            function drawLine(blocks, lineNo) {
                return blocks.map(function (block) {
                    return block[lineNo];
                }).join(" ");
            }

            function drawRow(row, rowNum) {
                var blocks = row.map(function (cell, colNum) {
                    return cell.draw(widths[colNum], heights[rowNum]);
                });
                return blocks[0].map(function (_, lineNo) {
                    return drawLine(blocks, lineNo);
                }).join("\n");
            }

            return rows.map(drawRow).join("\n");
        }

        function repeat(string, times) {
            var result = "";
            for (var i = 0; i < times; i++)
                result += string;
            return result;
        }

        function TextCell(text) {
            this.text = text.split("\n");
        }
        TextCell.prototype.minWidth = function () {
            return this.text.reduce(function (width, line) {
                return Math.max(width, line.length);
            }, 0);
        };
        TextCell.prototype.minHeight = function () {
            return this.text.length;
        };
        TextCell.prototype.draw = function (width, height) {
            var result = [];
            for (var i = 0; i < height; i++) {
                var line = this.text[i] || "";
                result.push(line + repeat(" ", width - line.length));
            }
            return result;
        };

        function UnderlinedCell(inner) {
            this.inner = inner;
        }
        UnderlinedCell.prototype.minWidth = function () {
            return this.inner.minWidth();
        };
        UnderlinedCell.prototype.minHeight = function () {
            return this.inner.minHeight() + 1;
        };
        UnderlinedCell.prototype.draw = function (width, height) {
            return this.inner.draw(width, height - 1)
                .concat([repeat("-", width)]);
        };

        function dataTable(data) {
            var keys = Object.keys(data[0]);
            var headers = keys.map(function (name) {
                return new UnderlinedCell(new TextCell(name));
            });
            var body = data.map(function (row) {
                return keys.map(function (name) {
                    return new TextCell(String(row[name]));
                });
            });
            return [headers].concat(body);
        }
        console.log(drawTable(dataTable(store.products)))
        store.promptUser();
    }

    this.queryForProducts = function () {
        let qt = 'SELECT * FROM products'
        connection.query(qt, function (err, res) {
            if (err)
                console.log(err);
            else
                store.products = res;
            store.displayProducts();
        })
    }
}

var store = new Store();

store.queryForProducts();
