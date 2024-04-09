library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.STD_LOGIC_UNSIGNED.ALL;
use IEEE.NUMERIC_STD.ALL;

entity DHT11_Interface is
    Port ( clk : in STD_LOGIC;
           dht11_data : inout STD_LOGIC; -- Data pin connected to DHT11
           temperature : out STD_LOGIC_VECTOR (7 downto 0);
           humidity : out STD_LOGIC_VECTOR (7 downto 0));
end DHT11_Interface;

architecture Behavioral of DHT11_Interface is
    signal start_signal : integer := 0; -- Trigger to start communication
    signal data_buffer : STD_LOGIC_VECTOR (39 downto 0);
    signal bit_counter : integer := 0;
    signal state : integer := 0;
    signal clk_divider : integer := 0;
    constant CLK_FREQ : integer := 100000000; -- 1MHz 
    constant DHT11_WAIT : integer := CLK_FREQ * 30/100000000; -- waiting 30us for DHT11 response
    -- Additional constants for timing accuracy
    constant FPGA_START_SIGNAL : integer := CLK_FREQ * 20/100000; -- 20ms for start signal by fpga
    constant DHT_REPSPONSE_SIGNAL : integer := CLK_FREQ * 80/100000000; -- 80us for the MCU to acknowledge that the sensor will start to transmit data
    constant START_TRANSMISSION_PER_BIT : integer := CLK_FREQ * 50/100000000; -- 50us low before transmitting each bit
    constant LOW_MINIMUM_SPAN : integer := CLK_FREQ * 26/100000000; -- at least 26 us high for value 0 of the bit-data
    constant LOW_MAXIMUM_SPAN : integer := CLK_FREQ * 28/100000000; -- at most 28 us high for value 0 of the bit-data
    constant HIGH_SPAN : integer := CLK_FREQ * 70/100000000; -- 70 us high for value 1 of the bit-data
    -- signal bit_one : BOOLEAN := FALSE; -- default state is 0 for the transmitted bit
   
begin
    process(clk)
    begin
        if rising_edge(clk) then
            start_signal <= 1;
            clk_divider <= clk_divider + 1;
            case state is
                when 0 =>
                    report "-1";
                    if start_signal = 1 and state = 0 then
                        dht11_data <= '0'; -- Send start signal
                        state <= 1;
                        clk_divider <= 0;
                        report "State: " & integer'image(state) severity note;
                    end if;
                    report "State: " & integer'image(state) severity note;
                when 1 =>
                    report "hello";
                    if clk_divider = FPGA_START_SIGNAl then
                        report "hellooo";
                        dht11_data <= '1'; -- Release line, assuming tri-state capability
                        state <= 2;
                        clk_divider <= 0;
                    end if;
                when 2 =>
                    if clk_divider = DHT11_WAIT then
                        -- Configure pin as input (release line) if FPGA supports tri-state
                        -- This may require external pull-up or specific FPGA configuration
                        dht11_data <= 'Z'; -- Release line, assuming tri-state capability
                        state <= 3;
                        clk_divider <= 0;
                    end if;
                when 3 =>
                    if dht11_data = '0' then -- Wait for DHT11 to pull low
                        state <= 4;
                        clk_divider <= 0;
                    end if;
                when 4 =>
                    if dht11_data = '1' then -- Wait for DHT11 to go high again
                        state <= 5;
                        clk_divider <= 0;
                    end if;
                when 5 =>
                    -- Adjusted sampling to occur at a more accurate midpoint of expected high state
                    if clk_divider = DHT_REPSPONSE_SIGNAL and dht11_data = '0' then
                        state <= 6;
                        clk_divider <= 0;
                    end if;
                when 6 => 
                    if clk_divider = START_TRANSMISSION_PER_BIT and dht11_data = '1' then
                        state <= 7;
                        clk_divider <= 0;
                    end if;
                when 7 =>
                     if clk_divider <= HIGH_SPAN then
                     
                        if clk_divider > LOW_MAXIMUM_SPAN and dht11_data = '0' then
                           data_buffer(39 - bit_counter) <= '0';
                           bit_counter <= bit_counter + 1;
                           clk_divider <= 0;
                        end if;                     
                     
                        if clk_divider = HIGH_SPAN then
                           data_buffer(39 - bit_counter) <= '1';    
                           bit_counter <= bit_counter + 1;
                           clk_divider <= 0;
                        end if;
                        
                        if bit_counter = 39 then -- Adjusted for 0-based index
                            state <= 8; -- Data capture complete
                            bit_counter <= 0; -- Reset bit counter for next reading
                        else
                            state <= 7; -- Go back to capture next bit
                        end if;
                    else 
                    report "Error reading from the sensor!" severity error;
                    end if;
                when 8 =>
                    -- Data processing here
                    -- For simplicity, assuming only integer parts are needed
                    humidity <= data_buffer(39 downto 32);
                    temperature <= data_buffer(23 downto 16);
                    
                    state <= 0; -- Reset for next reading
                    clk_divider <= 0; -- Reset clock divider
                when others =>
                    -- Signal an error condition or take appropriate action
                    report "Reached undefined state in case statement" severity error;

            end case;
        end if;
    end process;
end Behavioral;
