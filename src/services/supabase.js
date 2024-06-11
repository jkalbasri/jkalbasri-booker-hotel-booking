import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://brkefrdwnwgnraxrinuk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJya2VmcmR3bndnbnJheHJpbnVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTczODA3MjMsImV4cCI6MjAzMjk1NjcyM30.SM5q7k-FL82SKyc5bRrboYGz0GtErYXgbfH7pxCic5w";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
