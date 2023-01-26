export default function getHTML() {
  return (`
    <div>
      <h1>Form</h1>
      <form action="/home" method="post">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
        <input type="submit" value="Submit" />
      </form>
    </div>
    `)
}