import supabase from "./superbase";

const TABLE_NAME = "deserts";

interface Desert {
  desert_name: string;
  calories: number;
}

export async function getDeserts() {
  const { data, error } = await supabase.from(TABLE_NAME).select("*");

  if (error) {
    throw error;
  }
  return data;
}

export async function createDesert(desert: Desert) {
  const { data, error } = await supabase.from(TABLE_NAME).insert([desert]);

  if (error) {
    throw error;
  }
  return data;
}

export async function updateDesert(desert_uuid: string, desert: Desert) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(desert)
    .match({ desert_uuid });

  if (error) {
    throw error;
  }
  return data;
}

export async function deleteDesert(desert_uuid: string) {
  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .match({ desert_uuid });

  if (error) {
    throw error;
  }
}
