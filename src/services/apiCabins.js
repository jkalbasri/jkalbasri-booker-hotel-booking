import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded :(");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  // 1. Create image url

  // make image name truely unique and remove all slashes (/)
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  // https://ufarhfwnvrkiaxjhjrnl.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 2. create/edit cabin
  // A) Create
  let query = supabase.from("cabins");
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) Edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single(); // insert sometime do not immedietely returns the row, wo we attach .select.single to make sure of it;
  if (error) {
    console.log(error);
    throw new Error("Cabin could not be created :(");
  }

  // if image already exists, do not upload anything
  if (hasImagePath) return;
  // 3. If cabins is inserted successfully, upload the image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  if (storageError) {
    // 4. if there was error while uploading image, delete the cabin
    await supabase.from("cabins").delete().eq("id", data[0].id);
    throw new Error("Error while uploading image, cabin was not created");
  }

  return data;
}

export async function deleteCabins(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted :(");
  }
  return data;
}
