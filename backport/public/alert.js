    New = {
            status: 'success',
            title: '',
            content: '',
            alert: function ({ status, title, content, confirmbtn = true }) {
              var title;
              var status;
              var content;
              var modal = document.createElement('section');
              modal.setAttribute('class', 'alert_modal');
              document.body.append(modal);
              var alert = document.createElement('div');
              alert.setAttribute('class', 'alert_container');
              modal.appendChild(alert);
              if (title == '' || title == null) {
                title = this.title;
              } else {
                title = title
              }
              if (status == '' || status == null) {
                status = this.status;
              } else {
                status = status;
              }
              if (content == '' || content == null) {
                content = this.content;
              } else {
                content = content
              }
              alert.innerHTML = `
                       <div class="alert_heading"></div>
                  <div class="alert_details">
                      <h2>
                        ${title}
                      </h2>
                      <p>
                          ${content}
      
                      </p>
                  </div>
                  <div class="alert_footer"></div>
                       ` ;
      
              var alert_heading = document.querySelector('.alert_heading');
              var alert_footer = document.querySelector('.alert_footer');
              if (status == '' || status == 'success') {
                alert_heading.innerHTML = `
                          <svg width="80" height="80" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0"/></path><path stroke-dasharray="14" stroke-dashoffset="14" d="M8 12L11 15L16 10"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="14;0"/></path></g></svg>
                          `;
                alert_footer.innerHTML = `
                       <span class="close" title="Ok">
                        Ok
                      </span>
                       `;
                alert_heading.style = 'background: linear-gradient(80deg, #67FF86, #1FB397);';
                document.querySelector('.alert_details > h2').style.color = '#1FB397';
              } else if (status == 'danger' || status == 'error') {
                alert_heading.innerHTML = `
                          <svg width="80" height="80" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="white" stroke-linecap="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0"/></path><path stroke-dasharray="8" stroke-dashoffset="8" d="M12 12L16 16M12 12L8 8M12 12L8 16M12 12L16 8"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="8;0"/></path></g></svg>
                          `;
                alert_footer.innerHTML = `
                       <span class="close" title="Ok">
                        Ok
                      </span>
                       `;
                alert_heading.style = ' background: linear-gradient(80deg, #FF6767, #B31F1F);';
                document.querySelector('.alert_details > h2').style.color = '#B31F1F';
              } else if (status == 'info' || status == 'confirm') {
                alert_heading.innerHTML = `
                          <svg width="80" height="80" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="white" stroke-linecap="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0"/></path><path stroke-dasharray="20" stroke-dashoffset="20" d="M8.99999 10C8.99999 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10C15 10.9814 14.5288 11.8527 13.8003 12.4C13.0718 12.9473 12.5 13 12 14"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.4s" values="20;0"/></path></g><circle cx="12" cy="17" r="1" fill="white" fill-opacity="0"><animate fill="freeze" attributeName="fill-opacity" begin="1s" dur="0.2s" values="0;1"/></circle></svg>
                          `;
                confirmbtn == true ?
                  alert_footer.innerHTML = `
                       <span class="accept" title="I approve">
                        I approve
                      </span>
                      <span class="close" title="I refuse">
                        I refuse
                      </span>
                       `
                  :
                  alert_footer.innerHTML = `
                      <span class="close" title="Ok">
                     Ok
                      </span>
                       `
                  ;
                alert_heading.style = 'background: linear-gradient(80deg, #7ED1FF, #484B95);';
                document.querySelector('.alert_details > h2').style.color = '#484B95';
              }
              document.querySelector('.alert_footer .close').addEventListener('click', function () {
                alert.remove();
                modal.remove();
              })
            }
          }
