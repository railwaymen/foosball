class CreateGroupsService
  def initialize(tournament, amount)
    @tournament = tournament
    @amount = amount
    raise 'Incorrect amount' if @amount < 2 || @amount > 8
  end

  def call
    create_groups
    add_teams
  end

  private

  def create_groups
    letter = 'A'
    @amount.times do |index|
      @tournament.groups.create!(name: letter)
      letter = letter.next
    end
  end

  def add_teams
    team_ids = @tournament.teams.ids.shuffle
    amount_in_groups = calculate_amount_in_groups(@tournament.teams.count, @amount)
    @tournament.groups.each_with_index do |group, index|
      amount_in_groups[index].times do
        team_id = team_ids.pop
        group.groups_teams.create!(team_id: team_id)
      end
    end
  end

  def calculate_amount_in_groups(count, divide_by)
    amounts_array = []
    count = count.to_f
    loop do
      value = (count / divide_by).round
      amounts_array << value
      count = count - value
      divide_by = divide_by - 1
      break if divide_by.zero?
    end
    amounts_array.sort
  end
end
