const Menu=require("../Models/menu");

module.exports.index=async (req, res) => {
    const menulist = await Menu.find({});
    res.render("food/menu.ejs", { menulist });
    // console.log(menulist);
  }

  module.exports.newform=(req, res) => {
    res.render("food/new.ejs");
  }

  module.exports.newmenu=async (req, res) => {
    let url=req.file.path;
    let filename=req.file.filename;
    const { name, price, image, category, availability } = req.body.menu;
    const newMenu = new Menu({
      name,
      price,
      image: {
        url: image,
      },
      category,
      availability,
    });
    newMenu.image={url,filename};
   await newMenu.save();
   res.redirect("/menu");
    
  }
  module.exports.show=async (req, res) => {
    let { id } = req.params;
    let menuitem = await Menu.findById(id);
   // console.log(menuitem);
    if (!menuitem) {
      req.flash("error", "item does not exists");
    }
  
    res.render("food/show.ejs", { menuitem });
  }
  module.exports.editform=async (req, res) => {
      let { id } = req.params;
      let menuitem = await Menu.findById(id);
      res.render("food/edit.ejs", { menuitem });
    }
  module.exports.edit=async (req, res) => {
    let { id } = req.params;
    let { name, price, image, category, availability } = req.body.menu;
   console.log(name, price,image,category,availability);
   let editmenu = await Menu.findByIdAndUpdate(
    id,
    {
      name,
      price,
      image: {
        url: image,
      },
      category,
      availability,
    },
    { runValidators: true, new: true }
  );
  if(typeof req.file !== "undefined"){
    let url=req.file.path;
  let filename=req.file.filename;
    editmenu.image={url,filename};
    await  editmenu.save();
  }
    req.flash("success", "update item successfully");
    res.redirect(`/menu/${id}`);
  }
  module.exports.delete=async (req, res) => {
      const { id } = req.params;
      const deletemenu = await Menu.findByIdAndDelete(id);
      console.log(`Deleted menu:`, deletemenu);
      req.flash("success", " item delete successfuly");
      res.redirect("/menu");
    }
 