if (typeof MulticolorGauge === 'undefined') {
    class MulticolorGauge {
      constructor(config, scope) {
        this.containerId = config.containerId;
        this.labels = config.labels || [];
        this.data = config.data;
        this.colors = config.colors;
        this.title = config.title || '';
        this.pointerColor = config.pointerColor || 'black';
        this.units = config.units || '';
        this.min = config.min || 0;
        this.max = config.max || 100;
        this.scope = scope;

        this.initGauge();
      }

      initGauge() {
        const container = document.createElement('div');
        container.style = 'width:100%;max-width:230px;margin:auto;position:relative;';

        this.gaugeCanvas = document.createElement('canvas');
        this.pointerCanvas = document.createElement('canvas');
        this.gaugeCanvas.width = this.pointerCanvas.width = 230;
        this.gaugeCanvas.height = this.pointerCanvas.height = 230;

        container.appendChild(this.gaugeCanvas);
        this.pointerCanvas.style = 'position:absolute;top:0;left:0;';
        container.appendChild(this.pointerCanvas);

        this.valueDiv = document.createElement('div');
        this.valueDiv.style = 'position:absolute;width:100%;top:90%;text-align:center;font-size:16px;font-weight:bold;';
        container.appendChild(this.valueDiv);

        document.getElementById(this.containerId).appendChild(container);

        const ctx = this.gaugeCanvas.getContext('2d');
        this.chart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: this.labels,
            datasets: [{
              data: this.data,
              backgroundColor: this.colors,
              borderWidth: 0
            }]
          },
          options: {
            rotation: 270,
            circumference: 180,
            cutout: '65%',
            plugins: {
              tooltip: { enabled: false },
              legend: { display: false },
              title: {
                display: true,
                text: this.title,
                font: { size: 18 }
              }
            }
          }
        });

        this.scope.$watch('msg.payload', (value) => {
          if (typeof value === 'number') {
            this.update(value);
          }
        });
      }

      drawPointer(angle) {
        const ctxP = this.pointerCanvas.getContext('2d');
        ctxP.clearRect(0, 0, this.pointerCanvas.width, this.pointerCanvas.height);
        ctxP.strokeStyle = this.pointerColor;
        ctxP.lineWidth = 2;

        ctxP.save();
        ctxP.translate(this.pointerCanvas.width / 2, this.pointerCanvas.height - 40);
        ctxP.rotate(angle);
        ctxP.beginPath();
        ctxP.moveTo(0, 0);
        ctxP.lineTo(0, -100);
        ctxP.stroke();
        ctxP.restore();
      }

      update(value) {
        this.valueDiv.innerText = value.toFixed(1) + this.units;
        let clamped = Math.max(this.min, Math.min(this.max, value));
        let angle = ((clamped - this.min) / (this.max - this.min)) * Math.PI - Math.PI / 2;
        this.drawPointer(angle);
      }
    }

    // Export the class globally:
    window.MulticolorGauge = MulticolorGauge;
}
