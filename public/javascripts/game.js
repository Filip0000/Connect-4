class Game {
    constructor(selector) {
        this.rows = 6;
        this.cols = 7;
        this.selector = selector;
        this.mouseEvents();
        this.onPlayerMove = function () { }
        this.canMove = true;
        this.checkIfEnd();
        this.opponentColor = 'Yellow';
        this.player = 'Red';
        this.end = false;
    }

    $getCell(x, y) {
        return $(`.col[rowidx='${x}'][colidx='${y}']`);
    }
    setPlayerColor(color) {
        if (color) {
            this.player = 'Red'
            this.opponentColor = 'Yellow'
            this.canMove = true;
        } else {

            this.player = 'Yellow'
            this.opponentColor = 'Red'
            this.canMove = false;
        }
    }

    checkIfEnd() {
        const  that = this;
        for (let i = 0; i < that.rows; i++) {
            for (let j = 0; j <= that.cols - 4; j++) {
                let f = true;
                for (let z = j + 1; z < j + 4; z++) {
                    const $cell = that.$getCell(i, z);
                    const $prevcell = that.$getCell(i, z - 1);

                    if (!($prevcell.hasClass('Yellow')) && !($prevcell.hasClass('Red'))) {
                        f = false;
                        break;
                    }
                    if (!($cell.hasClass('Yellow')) && !($cell.hasClass('Red'))) {
                        f = false;
                        break;
                    }
                    if ($cell.hasClass('Yellow') && !($prevcell.hasClass('Yellow'))) {
                        f = false;
                        break;
                    }
                    if ($cell.hasClass('Red') && !($prevcell.hasClass('Red'))) {
                        f = false;
                        break;
                    }
                }

                if (f === true) {
                    const $cell = that.$getCell(i, j);
                    if ($cell.hasClass('Yellow'))
                        return 'Yellow';
                    else if ($cell.hasClass('Red'))
                        return 'Red';
                }
            }
        }

        for (let i = 0; i <= that.rows - 4; i++) {
            for (let j = 0; j < that.cols; j++) {
                let f = true;
                for (let z = i + 1; z < i + 4; z++) {
                    const $cell = that.$getCell(z, j);
                    const $prevcell = that.$getCell(z - 1, j);

                    if (!($prevcell.hasClass('Yellow')) && !($prevcell.hasClass('Red'))) {
                        f = false;
                        break;
                    }
                    if (!($cell.hasClass('Yellow')) && !($cell.hasClass('Red'))) {
                        f = false;
                        break;
                    }
                    if ($cell.hasClass('Yellow') && !($prevcell.hasClass('Yellow'))) {
                        f = false;
                        break;
                    }
                    if ($cell.hasClass('Red') && !($prevcell.hasClass('Red'))) {
                        f = false;
                        break;
                    }
                }

                if (f === true) {
                    const $cell = that.$getCell(i, j);
                    if ($cell.hasClass('Yellow'))
                        return 'Yellow';
                    else if ($cell.hasClass('Red'))
                        return 'Red';
                }
            }
        }

        for (let i = 0; i <= that.rows - 4; i++) {
            for (let j = 0; j <= that.cols - 4; j++) {
                let f = true;
                for (let z = j + 1; z < j + 4; z++) {
                    const $cell = that.$getCell(i + (z - j), z);
                    const $prevcell = that.$getCell(i + ((z - 1) - j), z - 1);

                    if (!($prevcell.hasClass('Yellow')) && !($prevcell.hasClass('Red'))) {
                        f = false;
                        break;
                    }
                    if (!($cell.hasClass('Yellow')) && !($cell.hasClass('Red'))) {
                        f = false;
                        break;
                    }
                    if ($cell.hasClass('Yellow') && !($prevcell.hasClass('Yellow'))) {
                        f = false;
                        break;
                    }
                    if ($cell.hasClass('Red') && !($prevcell.hasClass('Red'))) {
                        f = false;
                        break;
                    }
                }

                if (f === true) {
                    const $cell = that.$getCell(i, j);
                    if ($cell.hasClass('Yellow'))
                        return 'Yellow';
                    else if ($cell.hasClass('Red'))
                        return 'Red';
                }
            }
        }

        for (let i = that.rows - 1; i >= 3; i--) {
            for (let j = 0; j <= that.cols - 4; j++) {
                let f = true;
                for (let z = j + 1; z < j + 4; z++) {
                    const $cell = that.$getCell(i - (z - j), z);
                    const $prevcell = that.$getCell(i - ((z - 1) - j), z - 1);

                    if (!($prevcell.hasClass('Yellow')) && !($prevcell.hasClass('Red'))) {
                        f = false;
                        break;
                    }
                    if (!($cell.hasClass('Yellow')) && !($cell.hasClass('Red'))) {
                        f = false;
                        break;
                    }
                    if ($cell.hasClass('Yellow') && !($prevcell.hasClass('Yellow'))) {
                        f = false;
                        break;
                    }
                    if ($cell.hasClass('Red') && !($prevcell.hasClass('Red'))) {
                        f = false;
                        break;
                    }
                }

                if (f === true) {
                    const $cell = that.$getCell(i, j);
                    if ($cell.hasClass('Yellow'))
                        return 'Yellow';
                    else if ($cell.hasClass('Red'))
                        return 'Red';
                }
            }
        }

        return null;
    }

    onOpponentMove(moveObject) {
        const $cell = this.$getCell(moveObject.row, moveObject.col);

        $cell.removeClass('free');
        console.log(this.opponentColor)
        $cell.addClass(this.opponentColor);

        if (this.checkIfEnd() != null) {
            if (this.checkIfEnd() === 'Red') {
                $(this.selector).append('<h1 class="lastTextRed">Red player won!!!</h1>');
                this.canMove = false;
                return;
            }
            else {
                $(this.selector).append('<h1 class="lastTextYellow">Yellow player won!!!</h1>');
                this.canMove = false;
                return;
            }
        }
        else
            this.canMove = true;
        $(this).trigger('mouseenter');
    }

    mouseEvents() {
        const $table = $(this.selector);
        const that = this;

        function $getCell(x, y) {
            return $(`.col[rowidx='${x}'][colidx='${y}']`);
        }

        function lastFreeCell($col) {
            for (let i = that.rows - 1; i >= 0; i--) {
                const $cell = $getCell(i, $col);

                if ($cell.hasClass('free'))
                    return $cell;
            }

            return null;
        }

        

        $table.on('mouseenter', '.col.free', function () {
            const $col = $(this).attr('colidx');
            const $cell = lastFreeCell($col);

            if (that.player === 'Red')
                $cell.addClass('preRed');
            else
                $cell.addClass('preYellow');
        });

        $table.on('mouseleave', '.col.free', function () {
            if (that.player === 'Red')
                $('.col.free').removeClass('preRed');
            else
                $('.col.free').removeClass('preYellow');
        });


        $table.on('click', '.col.free', function () {
            if (that.canMove) {
                const $col = $(this).attr('colidx');
                const $cell = lastFreeCell($col);

                if (that.player === 'Red') {
                    $cell.removeClass('preRed');
                    $cell.removeClass('free');
                    $cell.addClass('Red');
                }
                else {
                    $cell.removeClass('preYellow');
                    $cell.removeClass('free');
                    $cell.addClass('Yellow');
                }

                var cellRow = $cell.attr('rowidx')
                var cellCol = $cell.attr('colidx')
                that.canMove = false;
                that.onPlayerMove({ col: cellCol, row: cellRow });

                if (that.checkIfEnd() != null) {
                    if (that.checkIfEnd() === 'Red') {
                        $table.append('<h1 class="lastTextRed">Red player won!!!</h1>');
                        this.canMove = false;
                        return;
                    }
                    else {
                        $table.append('<h1 class="lastTextYellow">Yellow player won!!!</h1>');
                        this.canMove = false;
                        return;
                    }
                }


                $(this).trigger('mouseenter');
            }
        })
    }
}