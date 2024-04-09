    library IEEE;
    use IEEE.STD_LOGIC_1164.ALL;
    use IEEE.STD_LOGIC_UNSIGNED.ALL;
    use IEEE.NUMERIC_STD.ALL;
    
    entity DHT11_Interface_tb is
    -- Testbench has no ports!
    end DHT11_Interface_tb;
    
    architecture behavior of DHT11_Interface_tb is
    
        -- Component Declaration for the Unit Under Test (UUT)
        component DHT11_Interface
        port(
             clk : in std_logic;
             dht11_data : inout std_logic;
             temperature : out std_logic_vector(7 downto 0);
             humidity : out std_logic_vector(7 downto 0)
            );
        end component;
    
        --Inputs
        signal clk : std_logic := '0';
        -- signal start_signal : std_logic := '0';
    
        --Inout
        signal dht11_data : std_logic := '1'; -- Normally high (pull-up)
    
        --Outputs
        signal temperature : std_logic_vector(7 downto 0) := (others => '0');
        signal humidity : std_logic_vector(7 downto 0) := (others => '0');
    
        -- Clock period definitions
        constant clk_period : time := 10 ns; -- chose 1MHz for the clock rate
    
    begin
    
        -- Instantiate the Unit Under Test (UUT)
        uut: DHT11_Interface
        port map (
              clk => clk,
              dht11_data => dht11_data,
              temperature => temperature,
              humidity => humidity
            );
    
        -- Clock process definitions
        clk_process :process
        begin
            clk <= '0';
            wait for clk_period/2;
            clk <= '1';
            wait for clk_period/2;
        end process;
    
        -- ... (the rest of the code remains unchanged)
    
    -- Stimulus process
    stim_proc: process
    begin       
        -- hold reset state for 100 ns.
        wait for 100 ns;
        dht11_data <= '0';
        wait for 10 ns;
        dht11_data <= '1';
        wait for 10 ns;
        dht11_data <= '0';  
        
        -- Stimulate the Start Signal
        -- start_signal <= '1';
        --wait for 20000000 ns; -- Hold the start signal for 30ns
        --if dht11_data = '1' then
        --start_signal <= '1';
        -- end if;
        
        -- Simulate the DHT11 response
        wait for 20 ms; -- This will be past the 18ms required by the DHT11
        wait for 30 us; -- DHT11 pulls the line low for 80us
        dht11_data <= '0';
        wait for 80 us;
        dht11_data <= '1'; -- DHT11 pulls the line high for 80us
        wait for 80 us;
        
        -- Simulate 40 bits of data from the DHT11
        -- For simplicity, let's just send 40 bits of '0'
        -- Each bit starts with a 50us low and a high of 26-28us for '0', 70us for '1'
        for i in 1 to 40 loop
            dht11_data <= '0'; -- Start of bit, DHT11 pulls low
            wait for 50 us;
            if i mod 2 = 0 then
                dht11_data <= '1'; -- Length of this high pulse determines '0' or '1'
                wait for 26 us; -- Change this to 70 us for a '1'
            else
                dht11_data <= '1';
                wait for 70 us;
            end if;
        end loop;
        
        -- Ensure the line is released after transmission
        wait for 50 us;
        dht11_data <= '1'; -- DHT11 releases the line
        wait for 100 ms; -- Adjust this time as needed

    -- Stop the simulation
         --stop <= '1';
        --wait;-- will wait forever
    end process;
    
    
    end;
