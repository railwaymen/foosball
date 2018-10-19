# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_10_19_110045) do

  create_table "api_keys", force: :cascade do |t|
    t.string "client_id", null: false
    t.string "client_secret", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "games", force: :cascade do |t|
    t.integer "red_attacker_id", null: false
    t.integer "red_defender_id", null: false
    t.integer "blue_attacker_id", null: false
    t.integer "blue_defender_id", null: false
    t.integer "red_score", null: false
    t.integer "blue_score", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "started_at"
    t.datetime "finished_at"
    t.index ["blue_attacker_id"], name: "index_games_on_blue_attacker_id"
    t.index ["blue_defender_id"], name: "index_games_on_blue_defender_id"
    t.index ["red_attacker_id"], name: "index_games_on_red_attacker_id"
    t.index ["red_defender_id"], name: "index_games_on_red_defender_id"
  end

  create_table "players", force: :cascade do |t|
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "email", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tournament_players", force: :cascade do |t|
    t.integer "player_id", null: false
    t.integer "tournament_id", null: false
    t.string "position", default: "attacker", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["player_id", "tournament_id"], name: "index_tournament_players_on_player_id_and_tournament_id", unique: true
    t.index ["player_id"], name: "index_tournament_players_on_player_id"
    t.index ["tournament_id"], name: "index_tournament_players_on_tournament_id"
  end

  create_table "tournaments", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
