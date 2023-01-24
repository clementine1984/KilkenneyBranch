import React from "react";

export default function ECommerce() {
  return (
    <div className="ECommerce text-center">
      <section className="boxes">
        <div className="date">
          <div className="date1">
            <label className="label1">From</label>
            <input
              className="button"
              type="date"
              id="date1"
              min="01-01-00"
              max="01-01-99"
              value1="01-01-21"
            />
            <script>
              document.getElementById("date1").value = datePattern1;
              document.write(datePattern1);
            </script>
          </div>
          <div className="date1">
            <label className="label1">To</label>
            <input
              className="button"
              type="date"
              id="date2"
              min="01-01-00"
              max="01-01-99"
              value2="01-01-21"
            />
            <script>
              var dateControl2 = document.querySelector('input[type="date"]');
              dateControl.value = '2017-06-01';
            </script>
          </div>
        </div>
      </section>

      <section className="queries">
        <div className="container">
          <div className="row">
            <div className="col"></div>
          </div>
        </div>
      </section>

      <p>
        <br />
        <p>
          <br />
        </p>
        <p>
          <br />
        </p>
      </p>
      <section className="charts">
        <div className="container">
          <div className="row">
            <div className="col">
              <h2 className="border_left">Audience Overview :</h2>
            </div>
            <div className="col">
              <h2 className="border_left"> Acquisition Overview :</h2>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h2 className="border_left"> Behaviors Overview :</h2>
            </div>
            <div className="col"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
