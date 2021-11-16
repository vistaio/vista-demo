# Vista Demo
This is an example implementation of Vista on a project management application (JIRA-style), as showcased by the [Vista Demo](https://docs.govista.io/concepts/demo/).

The client libraries used can be found here:
- [JS Client Library](https://github.com/vistaio/vista-clients/tree/master/js/vista-api-client)
- [React Components](https://github.com/vistaio/vista-clients/tree/master/js/react-vista-js)

<br />

## What we show
We implement the following:
- [API](https://docs.govista.io/Guides/API/Checking%20User%20Access): checking permissions if user can create/view/delete issues, as well as edit project settings
- [React](https://docs.govista.io/Guides/React%20Components/ShowHideComponents): toggle show + hide buttons for creating/deleting issues and edit project settings based on user permissions

## Setup 🛠

- Install [postgreSQL](https://www.postgresql.org/) if you don't have it already and create a database named `jira_development`.
- `git clone https://github.com/oldboyxx/jira_clone.git`
- Create an empty `.env` file in `/api`, copy `/api/.env.example` contents into it, and fill in your database username and password.
- `npm run install-dependencies`
- `cd api && npm start`
- `cd client && npm start` in another terminal tab
- App should now be running on `http://localhost:8080/`

## License

[MIT](https://opensource.org/licenses/MIT)

## Credit
This base JIRA-clone application was forked from [here](https://github.com/oldboyxx/jira_clone/).
<hr>

<h3>
  <a href="https://github.com/vistaio/vista-demo/tree/master/client">View Frontend Application</a> |
  <a href="https://github.com/vistaio/vista-demo/tree/master/api">View API</a>
</h3>
