namespace :docker do
  desc 'build docker images'
  task :build do
    puts 'Generating static files for nginx'
    puts `bundle exec jekyll build`
    rm_rf './_site/assets' # remove this if we move where our CSS live
    puts 'Building acceptbitcoincash docker image'
    puts `docker build -t kenman345/acceptbitcoincashdocker .`
  end
end
