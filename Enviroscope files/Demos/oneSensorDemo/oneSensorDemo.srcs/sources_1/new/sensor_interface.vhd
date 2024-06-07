library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;

entity Sensor_Interface is
    Port (
        clk     : in STD_LOGIC;
        reset   : in STD_LOGIC;
        capture_data : in STD_LOGIC;  -- Input to trigger data capture
        data_out: out STD_LOGIC_VECTOR (39 downto 0)  -- Output 40 bits
    );
end Sensor_Interface;

architecture Behavioral of Sensor_Interface is
    signal sensor_data : unsigned(39 downto 0) := (others => '0');
begin
    process(clk, reset)
    begin
        if reset = '1' then
            sensor_data <= (others => '0');
        elsif rising_edge(clk) then
            if capture_data = '1' then
                sensor_data <= sensor_data + 1;
            end if;
        end if;
    end process;

    data_out <= std_logic_vector(sensor_data);  -- Convert 'unsigned' to 'STD_LOGIC_VECTOR' for output
end Behavioral;
