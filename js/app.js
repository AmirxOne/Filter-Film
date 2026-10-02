/* ==========================================================================
   Filter-Film — dropdown filter component
   Vanilla JS, no dependencies. Keyboard + pointer accessible.
   ========================================================================== */

(function () {
    'use strict';

    var dropdowns = Array.prototype.slice.call(document.querySelectorAll('[data-dropdown]'));
    var ESC = 'Escape';
    var FOCUSABLE = ['ArrowDown', 'ArrowUp', 'Home', 'End'];

    function menuOf(dropdown) {
        return dropdown.querySelector('.dropdown-menu');
    }

    function optionsOf(dropdown) {
        return Array.prototype.slice.call(dropdown.querySelectorAll('.dropdown-option'));
    }

    function isOpen(dropdown) {
        return dropdown.classList.contains('is-open');
    }

    function closeAll(except) {
        dropdowns.forEach(function (d) {
            if (d !== except) close(d);
        });
    }

    function close(dropdown) {
        dropdown.classList.remove('is-open');
        dropdown.classList.remove('is-animating');
        var toggle = dropdown.querySelector('.dropdown-toggle');
        toggle.setAttribute('aria-expanded', 'false');
    }

    function open(dropdown) {
        closeAll(dropdown);
        /* is-animating enables the CSS transition; removed on close so the
           menu can re-open instantly on the next cycle without a glitch. */
        dropdown.classList.add('is-animating', 'is-open');
        dropdown.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'true');
    }

    function select(dropdown, option) {
        optionsOf(dropdown).forEach(function (o) {
            o.setAttribute('aria-selected', 'false');
        });
        option.setAttribute('aria-selected', 'true');
        dropdown.querySelector('[data-label]').textContent = option.textContent.trim();
        dropdown.querySelector('.dropdown-toggle').focus();
        close(dropdown);
    }

    function focusedOptionIndex(dropdown) {
        return optionsOf(dropdown).indexOf(document.activeElement);
    }

    dropdowns.forEach(function (dropdown) {
        var toggle = dropdown.querySelector('.dropdown-toggle');

        toggle.addEventListener('click', function () {
            isOpen(dropdown) ? close(dropdown) : open(dropdown);
        });

        dropdown.addEventListener('click', function (e) {
            var option = e.target.closest('.dropdown-option');
            if (option) select(dropdown, option);
        });

        toggle.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                var opts = optionsOf(dropdown);
                open(dropdown);
                opts[e.key === 'ArrowDown' ? 0 : opts.length - 1].focus();
            }
        });

        dropdown.addEventListener('keydown', function (e) {
            var opts = optionsOf(dropdown);
            var i = focusedOptionIndex(dropdown);

            if (e.key === ESC) {
                close(dropdown);
                toggle.focus();
                return;
            }

            if (FOCUSABLE.indexOf(e.key) === -1) return;

            e.preventDefault();

            if (e.key === 'ArrowDown') i = (i + 1) % opts.length;
            else if (e.key === 'ArrowUp') i = (i - 1 + opts.length) % opts.length;
            else if (e.key === 'Home') i = 0;
            else if (e.key === 'End') i = opts.length - 1;

            opts[i].focus();
        });
    });

    /* Close every dropdown when clicking outside or pressing Escape. */
    document.addEventListener('click', function (e) {
        if (!e.target.closest('[data-dropdown]')) closeAll();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === ESC) closeAll();
    });
})();
