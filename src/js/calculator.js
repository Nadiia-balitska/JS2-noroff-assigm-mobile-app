document.addEventListener('DOMContentLoaded', () => {
  const xInput = document.getElementById('xValue');
  const calcBtn = document.getElementById('calculateBtn');
  const resultEl = document.getElementById('calcResult');

  const authorBtn = document.getElementById('authorBtn');
  const authorInfo = document.getElementById('authorInfo');

  if (calcBtn) {
    calcBtn.addEventListener('click', () => {
      const rawValue = xInput.value.replace(',', '.');
      const x = parseFloat(rawValue);

      if (isNaN(x)) {
        resultEl.textContent = 'Будь ласка, введіть коректне число для x.';
        return;
      }

      const y = 3 * x * x + 2 * x - 5;

      resultEl.textContent = `Для x = ${x} результат: y = 3·${x}² + 2·${x} − 5 = ${y.toFixed(
        2
      )}`;
    });
  }

  if (authorBtn) {
    authorBtn.addEventListener('click', () => {
      if (authorInfo.style.display === 'none' || authorInfo.style.display === '') {
        authorInfo.style.display = 'block';
      } else {
        authorInfo.style.display = 'none';
      }
    });
  }
});
