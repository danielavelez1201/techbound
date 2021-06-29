function fileUploadBasic() {
    return (<form action="http://localhost:5000/upload-file" method="post" enctype="multipart/form-data">
    <input type="file" name="file" />
    <button type="submit">Submit</button>
  </form>)
}

export default fileUploadBasic;