library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;  -- For using unsigned and signed types

entity DataPacker is
    Port (
        clk   : in  STD_LOGIC;
        reset : in  STD_LOGIC;
        data_in : in  STD_LOGIC_VECTOR(39 downto 0);  -- Input 40-bit data
        data_out : out STD_LOGIC_VECTOR(47 downto 0)  -- Output 48-bit data
    );
end DataPacker;

architecture Behavioral of DataPacker is
    signal data_to_send : std_logic_vector(39 downto 0);
    signal ethernet_frame_data : std_logic_vector(47 downto 0);
begin
    process(clk, reset)
    begin
        if reset = '1' then
            data_to_send <= (others => '0');
            ethernet_frame_data <= (others => '0');
        elsif rising_edge(clk) then
            -- Capturing data input into internal signal
            data_to_send <= data_in;

            -- Packing 40 bits into a 48-bit frame with 8-bit padding at the beginning
            ethernet_frame_data <= std_logic_vector(to_unsigned(0, 8)) & data_to_send;
        end if;
    end process;

    -- Output the packed data
    data_out <= ethernet_frame_data;
end Behavioral;
